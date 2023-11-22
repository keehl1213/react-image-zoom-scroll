import {
    Box,
    Divider,
    IconButton,
    Slider,
    Stack,
    SvgIcon,
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IconExtend, IconMax, IconMini, IconRobot } from 'assets';
// import { getMapImage } from 'apis/mapApi';

const min = 1;
const max = 5;
const step = 0.01;
const pixelCentimeterRate = 1 / 5; // 1pixel = 5cms
const initCentimeter = 650;
const CentimeterWidth = initCentimeter * pixelCentimeterRate; // 130

interface DeviceMapProps {
    imageBlob?: Blob;
    device?: StatusMeasurement;
}

const ImageZoom: React.FC<DeviceMapProps> = ({ device, imageBlob }) => {
    const mapWrapper = useRef<HTMLDivElement>();
    const mapWrapper2 = useRef<HTMLDivElement>();
    const [mapImage, setMapImage] = useState<string>();
    const [zoom, setZoom] = useState<number>(1);
    const [dimensions, setDimensions] = useState<{
        width: string;
        height: string;
        aspectRatio?: number;
    }>({ width: '100%', height: '450px' });
    const [start, setStart] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [pointX, setPointX] = useState(0);
    const [pointY, setPointY] = useState(0);
    const [panning, setPanning] = useState(false);

    useEffect(() => {
        if (imageBlob) {
            const thisUrl = URL.createObjectURL(imageBlob);
            setMapImage(thisUrl);
        }
    }, [imageBlob]);

    //   const getMapImageById = async (id: string) => {
    //       try {
    //           // const data = await getMapImage(id);
    //           // setMapImage(URL.createObjectURL(data));
    //       } catch (err) {
    //           console.error(err);
    //       }
    //   };

    const onImgLoad = ({
        target,
    }: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const img = target as HTMLImageElement;
        setDimensions({
            height: `${img.offsetHeight}px`,
            width: `${img.offsetWidth}px`,
            aspectRatio: img.offsetHeight / img.offsetWidth,
        });
    };

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        setPanning(true);
        e.preventDefault();
        const { clientX } = e;
        const { clientY } = e;
        setStart({ x: clientX - pointX, y: clientY - pointY });
    };

    const handleMouseUp = () => {
        setPanning(false);
    };

    const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        e.preventDefault();
        if (!panning) {
            return;
        }
        const { clientX } = e;
        const { clientY } = e;
        setPointX(clientX - start.x);
        setPointY(clientY - start.y);
    };

    const updateMap = (
        clientX: number,
        clientY: number,
        deltaY: number,
        z?: number,
    ) => {
        const delta = deltaY * -0.01;
        let nextZoom = z || zoom + delta;
        if (nextZoom < min) {
            nextZoom = min;
        }
        if (nextZoom > max) {
            nextZoom = max;
        }
        const ratio = 1 - nextZoom / zoom;

        setPointX(pointX + (clientX - pointX) * ratio);
        setPointY(pointY + (clientY - pointY) * ratio);
        setZoom(nextZoom);
    };

    const handleWheel = useCallback(
        (e: WheelEvent) => {
            e.preventDefault();
            const actualX =
                e.pageX -
                (mapWrapper.current?.getBoundingClientRect().left || 0);
            const actualY =
                e.pageY -
                (mapWrapper.current?.getBoundingClientRect().top || 0);

            const currentWidth = mapWrapper2.current?.scrollWidth || 0;
            const currentHeight = mapWrapper2.current?.scrollHeight || 0;

            const clientX =
                ((mapWrapper2.current?.offsetWidth || 0) * actualX) /
                (currentWidth || 1); // a simple proportion
            const clientY =
                ((mapWrapper2.current?.offsetHeight || 0) * actualY) /
                (currentHeight || 1);
            updateMap(clientX, clientY, e.deltaY);
        },
        [mapWrapper.current, mapWrapper2.current, pointX, pointY, zoom],
    );

    const divRefCallback = useCallback(
        (node: HTMLDivElement) => {
            if (node == null) {
                if (mapWrapper.current != null) {
                    /* This happens when the <div> component tries to detach the old divRefCallback.
                     * Since we are inside a `useCallback`, the `onWheel` callback being remove is still the old one here.
                     */
                    mapWrapper.current.removeEventListener(
                        'wheel',
                        handleWheel,
                    );
                }
                return;
            }
            mapWrapper.current = node;
            node.addEventListener('wheel', handleWheel, { passive: false });
        },
        [handleWheel],
    );

    const handleExtend = () => {
        if (mapWrapper.current) {
            setPointX(
                (mapWrapper.current.offsetWidth -
                    Number(dimensions.width.replace('px', ''))) /
                    2,
            );
            setPointY(
                (mapWrapper.current.offsetHeight -
                    Number(dimensions.height.replace('px', ''))) /
                    2,
            );
        }
        setZoom(1);
    };

    useEffect(() => {
        handleExtend();
    }, [mapWrapper.current, dimensions]);

    return (
        <Box
            ref={divRefCallback}
            sx={{
                position: 'relative',
                background: '#454545',
                border: '1px solid #707070',
                overflow: 'hidden',
                width:
                    dimensions.aspectRatio &&
                    dimensions.aspectRatio <= 1 &&
                    Number(dimensions.width.replace('px', '')) >
                        (mapWrapper.current?.parentElement?.offsetWidth || 0)
                        ? dimensions.width
                        : '100%',
                height:
                    dimensions.aspectRatio && dimensions.aspectRatio < 1
                        ? `calc(${dimensions.height} + 120px)`
                        : dimensions.height,
            }}
        >
            <Box
                ref={mapWrapper2}
                sx={{
                    transformOrigin: '0px 0px',
                    transform: `translate(${pointX}px, ${pointY}px) scale(${zoom})`,
                    position: 'relative',
                    cursor: panning ? 'grabbing' : 'grab',
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {mapImage &&
                    device?.value.current_pose.img_y !== undefined &&
                    device?.value.current_pose.img_x !== undefined && (
                        <SvgIcon
                            component={IconRobot}
                            inheritViewBox
                            sx={{
                                position: 'absolute',
                                top: device?.value.current_pose.img_y || 0,
                                left: device?.value.current_pose.img_x || 0,
                                // heading的0是朝右, 90是朝上, transform的0是朝上, 90是朝右 用此方式轉換
                                transform: `rotate(${
                                    device?.value.current_pose.heading !==
                                    undefined
                                        ? 360 -
                                          device.value.current_pose.heading +
                                          90
                                        : 0
                                }deg)`,
                            }}
                        />
                    )}
                {mapImage && (
                    <img
                        src={mapImage}
                        alt="real-time map"
                        style={{
                            display: 'block',
                        }}
                        onLoad={onImgLoad}
                    />
                )}
            </Box>
            {/* <Stack
                spacing={2}
                direction="row"
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    position: 'absolute',
                    bottom: 16,
                    left: 4,
                    padding: '6.5px 20px',
                    opacity: 0.9,
                }}
                alignItems="baseline"
            >
                <Box sx={{ color: '#454545', fontSize: '16px' }}>
                    {Math.round(
                        (CentimeterWidth / 100 / pixelCentimeterRate / zoom) *
                            10,
                    ) / 10}
                    m
                </Box>
                <Box
                    sx={{
                        width: `${CentimeterWidth}px`,
                        height: '8px',
                        border: '2px solid #454545',
                        borderTop: 'none',
                    }}
                />
            </Stack> */}
            <Stack
                spacing="10px"
                direction="row"
                sx={{
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 16,
                    right: 4,
                    width: '305px',
                    borderRadius: '24px',
                    padding: '3px 20px',
                    opacity: 0.9,
                }}
                alignItems="center"
            >
                <IconButton
                    disabled={!mapImage}
                    onClick={() => {
                        const clientX =
                            (mapWrapper.current?.offsetWidth || 0) / 2;
                        const clientY =
                            (mapWrapper.current?.offsetHeight || 0) / 2;
                        updateMap(clientX, clientY, 1);
                    }}
                    sx={{ padding: '5px' }}
                >
                    <IconMini />
                </IconButton>
                <Slider
                    disabled={!mapImage}
                    size="small"
                    min={min}
                    max={max}
                    step={step}
                    value={zoom}
                    onChange={(_, value) => {
                        const clientX =
                            (mapWrapper.current?.offsetWidth || 0) / 2;
                        const clientY =
                            (mapWrapper.current?.offsetHeight || 0) / 2;
                        const v = typeof value === 'number' ? value : value[0];
                        const deltaY = v > zoom ? -1 : 1;
                        updateMap(clientX, clientY, deltaY * 100, v);
                    }}
                />
                <IconButton
                    disabled={!mapImage}
                    onClick={() => {
                        const clientX =
                            (mapWrapper.current?.offsetWidth || 0) / 2;
                        const clientY =
                            (mapWrapper.current?.offsetHeight || 0) / 2;
                        updateMap(clientX, clientY, -1);
                    }}
                    sx={{ padding: '5px' }}
                >
                    <IconMax />
                </IconButton>
                <Box>{Math.round(zoom * 100)}%</Box>
                <Box sx={{ height: '20px' }}>
                    <Divider
                        orientation="vertical"
                        sx={{
                            borderColor: '#444444',
                        }}
                    />
                </Box>
                <IconButton
                    disabled={!mapImage}
                    onClick={handleExtend}
                    sx={{ padding: '0px', width: '25px', height: '25px' }}
                >
                    <IconExtend />
                </IconButton>
            </Stack>
        </Box>
    );
};

export default ImageZoom;

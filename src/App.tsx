import React, { useState } from 'react';
import { ImageZoom } from 'components';

const App: React.FC = () => {
    const [value, setValue] = useState<Blob>();
    return (
        <>
            <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                    const { files } = e.target;
                    if (files?.length) {
                        const blob = new Blob([files[0]], {
                            type: files[0].type,
                        });
                        setValue(blob);
                    }
                }}
            />
            <ImageZoom imageBlob={value} />
        </>
    );
};

export default App;

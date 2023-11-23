# React Image Zoom Scroll

圖片拖拉與放大縮小元件
![demo](/files/app-demo.gif)

[Demo](https://keehl1213.github.io/react-image-zoom-scroll/)

## 安裝方式

透過指令安裝

`$ npm install @keehl1213/react-image-zoom-scroll`

或設置package.json

`"@keehl1213/react-image-zoom-scroll": "0.2.0"`

## 使用方法

```typescript
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

```

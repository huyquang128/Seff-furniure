import { useEffect, useState } from 'react';

function EventResize({ size }) {
    const [isSize, setIsSize] = useState(size);

    useEffect(() => {
        window.addEventListener('resize', function () {
            setIsSize(window.innerWidth);
        });
        return () => {
            document.removeEventListener('resize', function () {});
        };
    }, []);

    return isSize;
}

export default EventResize;

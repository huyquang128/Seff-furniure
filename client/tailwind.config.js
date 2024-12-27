/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

    theme: {
        screens: {
            xs: '376px',
            // => @media (min-width: 375px) { ... }

            sm: '481px',
            // => @media (min-width: 425px) { ... }

            md: '769px',
            // => @media (min-width: 768px) { ... }

            lg: '1025px',
            // => @media (min-width: 1024px) { ... }

            xl: '1441px',
            // => @media (min-width: 1440px) { ... }
        },
        extend: {
            colors: {
                //mode light- dark admin
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                input: 'var(--input)',
                'text-first': 'var(--text-first)',
                'text-second': 'var(--text-second)',
                'text-third': 'var(--text-third)',
                'text-gray-1': 'var(--text-gray)',

                // user
                'black-base': '#333436',
                'black-second': '#1c1d1f',
                'black-text': '#4b5563',

                'yellow-base': '#B99674',
                'yellow-second': '#ffbf00',

                'white-second': '#ececec',
                'white-text': '#6e6d7a',
                'white-bg': '#f7f7f7',
                'white-f4': '#f4f4f4',
                'bg-slider': '#f1f1f1',
                'bg-text': '#56575b',

                'valid-input': '#ff0000',

                'text-gray': '#737373',
                'text-gray-second': '#999999',

                'bg-blue': '#e2ebf6',
                'text-blue': '#0D5CB6',

                'green-base': '#00B69B',
            },
            fontFamily: {
                roboto: ['roboto', 'sans-serif'],
            },
            boxShadow: {
                'model-1':
                    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                toolkit: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                'btn-slider': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                'home-product': 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                'qr-code':
                    'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
            },

            backgroundImage: {
                auth: "url('assets/image/bg-auth.jpg')",
                'living-1': "url('assets/image/room-living-1.jpeg')",
                'bedroom-1': "url('assets/image/bedroom.jpg')",
                shelf: "url('assets/image/shelf.jpg')",
            },
            backgroundColor: {
                models: 'rgba(0, 0, 0, 0.2)',
            },
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [require('tailwindcss-animate')],
};

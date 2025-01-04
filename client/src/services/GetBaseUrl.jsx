function GetBaseUrl() {
    const hostname = window.location.hostname;
    if (hostname === 'localhost') {
        return 'http://localhost:3000';
    } else {
        return 'https://seff-furniure-server.vercel.app';
    }
}

export default GetBaseUrl;

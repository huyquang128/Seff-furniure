function GetBaseUrl() {
    const hostname = window.location.hostname;
    if (hostname === 'localhost') {
        return 'http://localhost:3000';
    } else if (hostname === '192.168.1.193') {
        return 'http://192.168.1.193:3000';
    } else if (hostname === '172.20.10.3') {
        return 'http://172.20.10.3:3000';
    } else if (hostname === '10.5.50.185') {
        return 'http://10.5.50.185:3000';
    }

    return 'http://localhost:3000';
}

export default GetBaseUrl;

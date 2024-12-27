import { Bounce, toast } from 'react-toastify';

function ToastMessage({ message, position, status }) {
    const toastType = status === 'success' ? toast.success : toast.error;
    return toastType(`${message}`, {
        position: position,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        progress: false,
        transition: Bounce,
        className: 'custom-toast',
        bodyClassName: 'custom-body',
        progressClassName: 'custom-progress',
        icon: false,
    });
}

export default ToastMessage;

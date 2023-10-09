import { useEffect, useRef } from "react";

const useOutsideClick = (handler, listenCapturing = true) => {
    const modalContentRef = useRef()

    useEffect(() => {
        const handlerModal = (e) => {

            if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
                handler()
            }

        }

        document.addEventListener("click", handlerModal, listenCapturing)

        return () => document.removeEventListener("click", handlerModal, listenCapturing)

    }, [handler]);

    return {
        modalContentRef
    }
}

export default useOutsideClick;
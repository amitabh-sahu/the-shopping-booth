import React, { useState } from 'react'
import Loader from '../components/Loader';

const useLoader = () => {
    const [loadingState, setLoadingState] = useState(false);
    return [
        loadingState ? <Loader /> : null,
        () => setLoadingState(true),
        () => setLoadingState(false)
    ]
}

export default useLoader;
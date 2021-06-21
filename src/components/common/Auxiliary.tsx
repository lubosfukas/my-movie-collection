import React from 'react'

interface IProps {
    children: React.ReactNode
}

const Auxiliary: React.FC<IProps> = ({ children }) => <>{children}</>

export default Auxiliary

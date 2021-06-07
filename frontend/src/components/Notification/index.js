import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ variant, children, style }) => {
    return (
        <Alert variant={variant} style={style}>
            {children}
        </Alert>
    )
}

Notification.defaultProps = {
    variant: 'ínfo'
}

export default Notification;
export const ORDER_STATUSES = {
    PICKUP: {
        DRIVER_ASSIGNED: 'Driver Assigned for Pickup',
        CUSTOMER_REACHED: 'Arrived at Customer Location',
        PICKUP_INITIATED: 'Pickup Initiated',
        PICKUP_CONFIRMED: 'Pickup confirmed',
        DELIVERED_AT_WORKSHOP: 'Delivered at Workshop',
        VEHICLE_PICKED_UP: 'Vehicle Picked Up',
    },

    DELIVERY: {
        DRIVER_ASSIGNED_FOR_DELIVERY: 'Driver Assigned for Drop-Off',
        DELIVERY_INITIATED: 'Drop-Off Initiated',
        PICKED_FROM_WORK_SHOP: 'Vehicle picked from Workshop',
        CUSTOMER_REACHED: 'Arrived at customer location',
        VEHICLE_DELIVERED_CUSTOMER: 'Vehicle Delivered to Customer',
    }
}

export const EVENTS = {
    ORDER_UPDATED : 'Order Updated'
}
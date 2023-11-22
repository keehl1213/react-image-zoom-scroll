type OrderType = 'FOOD' | 'DELIVERY' | 'RESERVE';

type OrderResult =
    | 'ACCEPT'
    | 'STORE_NO_EXISTING'
    | 'CUSTOMER_NO_EXISTING'
    | 'OVER_STORAGE'
    | 'STORE_NOT_DELIVERY'
    | 'CUSTOMER_NOT_DELIVERY'
    | 'NO_ROBOT_SERVICE'
    | 'INPUT_DATA_ERROR';

type OrderStatus =
    | 'WAIT'
    | 'GO_TO_STORE'
    | 'WAIT_STORE_ENTER_PASSWORD'
    | 'STORE_PICK_UP'
    | 'GO_TO_CUSTOMER'
    | 'CLOSE_TO_CUSTOMER'
    | 'WAIT_CUSTOMER_ENTER_PASSWORD'
    | 'CUSTOMER_PICK_UP'
    | 'GO_TO_RECYCLE'
    | 'WAIT_RECYCLE_ENTER_PASSWORD'
    | 'RECYCLE_PICK_UP'
    | 'FINISH'
    | 'GO_STORE_FAIL'
    | 'GO_CUSTOMER_FAIL'
    | 'GO_RECYCLE_FAIL'
    | 'WAIT_STORE_ENTER_PASSWORD_TIMEOUT'
    | 'WAIT_CUSTOMER_ENTER_PASSWORD_TIMEOUT'
    | 'WAIT_RECYCLE_ENTER_PASSWORD_TIMEOUT'
    | 'RECYCLE_FINISH'
    | 'ERROR_HANDLER'
    | 'RESUME'
    | 'MANUAL_PROCESSING';

type OrderItem = {
    name: string;
    quantity: number;
    price: number;
    volume: Array<number>;
    stack: boolean;
    prepare_time: number;
};

type VerifyMode = 'PASSWORD' | 'NFC';

type Order = {
    id: number;
    service_id: number;
    service_name: string;
    estimate_time: number;
    actual_time: number;
    remaining_time?: number;
    create_time: string;
    update_time: string;
    customer_name: string;
    customer_phone: string;
    customer_gender: string;
    customer_address: string;
    customer_point: number;
    customer_password: string;
    map_id: string;
    recycle_point: number | null;
    recycle_address: string | null;
    store_id: number | null;
    store_name: string | null;
    store_prepare_time: number;
    store_address: string | null;
    store_point_id: number | null;
    store_password: string;
    order_number: string;
    order_type: OrderType;
    order_reserve_time: string;
    order_result?: OrderResult;
    order_status?: OrderStatus;
    order_msg?: string;
    device_id: number;
    device_name: string;
    device_storages: Array<number>;
    working_group: Array<number>;
    items: Array<OrderItem>;
    items_price: number;
    items_volume: Array<number>;
    delivery_fee: number;
    total_price: number | null;
    rating: number;
    release_robot_delay_time: number;
    store_verify_mode?: VerifyMode | null;
    customer_verify_mode?: VerifyMode | null;
    remark: string | null;
};

type Battery = {
    status: number;
    current: number;
    cyclecount: number;
    temperature: number;
    level: number;
    dock_status: number;
    SN: string;
    charging_cable: number;
    voltage: number;
};

type AsmStatus = {
    battery: Battery;
    status?: { door_status: number; reed_status: number }; // door_status: 0: 上下門都沒開1:下門開2:上門開3:上下門都開
    model: string;
    version: number;
    type: OrderType;
};

type StatusMeasurement = {
    value: {
        status: string;
        odometry: number;
        current_map: string;
        vendor: Wifundity;
        battery: Battery;
        timestamp: number;
        localization_status: boolean;
        sw_status: string;
        asm_status: AsmStatus;
        hw_status: string;
        current_pose: {
            img_y: number;
            img_x: number;
            y: number;
            x: number;
            z: number;
            heading: number;
        };
        hard_disk: { use: number; free: string };
        version: string;
        mode: string;
        dock_id: number;
        error_list: any;
    };
    key: string;
};

type RobotStatus = {
    token: string;
    device_id: number;
    state_measurements: Array<StatusMeasurement>;
};

type DeliveryType = 'CLOUD' | 'IMMEDIATE' | 'MIXED';

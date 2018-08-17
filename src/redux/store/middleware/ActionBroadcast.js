export function createActionBroadcaster(broadcastChannel) {
    return function actionBroadCaster(actionTypes) {
        return () => next => action => {
            if (
                !(action.meta && action.meta._copy) &&
                actionTypes.includes(action.type)
            ) {
                broadcastChannel.postMessage({
                    ...action,
                    meta: { _copy: true }
                });
            }
            next(action);
        };
    };
}

export function createActionDispatcher(dispatch) {
    return message => {
        dispatch(message.data);
    };
}

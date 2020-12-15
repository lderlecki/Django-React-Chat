const initialState = {
    workspace: null,
    room: null,
    isOwner: null,

}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type){
        default:
            return state
    }

}

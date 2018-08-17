import SecureLS from "secure-ls";

function createLoader(storage) {
    return function loadState() {
        try {
            const state = storage.get("state");
            if (state === "") return undefined;
            return state;
        } catch (error) {
            delete localStorage.state;
            delete localStorage._secure__ls__metadata;
            location.reload();
            return undefined;
        }
    };
}

const secureStorage = new SecureLS({ encodingType: "aes" });
const loadState = createLoader(secureStorage);
export default loadState;

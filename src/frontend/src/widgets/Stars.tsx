import { ReactNebula } from "@flodlc/nebula";

function Stars() {

    return (
        <>
                <ReactNebula config={{
                    sunScale: 0,
                    planetsScale: 0,
                    starsRotationSpeed: 7,
                    starsCount: 350
                }} />
        </>
    )
}

export default Stars

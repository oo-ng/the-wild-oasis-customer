import Spinner from "../_components/Spinner";

export default function loading () {
    return(
        <div className='text-xl text-primary-200 grid items-center justify-center'>
            <Spinner />
            Loading Cabin Data...
        </div>
    )
}

"use client"
import { useSearchParams, useRouter, usePathname} from "next/navigation"

export default function Flter () {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    function handleFilter(filter){
        const params = new URLSearchParams(searchParams)
        params.set("maxCapacity", filter)
        router.replace(`${pathname}?${params.toString()}`, {scroll:false})
    }

    const activeFilter = searchParams?.get('maxCapacity')??'all'
    console.log(activeFilter)
    return(
        <div className='border border-primary-800 flex'>
            <Button handleFilter={handleFilter} activeFilter = {activeFilter} filter='all' >All Cabins</Button>
            <Button handleFilter={handleFilter} activeFilter = {activeFilter} filter='small' >1&ndash;2 guests</Button>
            <Button handleFilter={handleFilter} activeFilter = {activeFilter} filter='medium' >3&ndash;7 guests</Button>
            <Button handleFilter={handleFilter} activeFilter = {activeFilter} filter='large' >8&ndash;12 guests</Button>
        </div>
    )
}

function Button ({handleFilter, children, filter, activeFilter }) {
    return(
        <button onClick={()=>handleFilter(filter)} 
        className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter? 'bg-primary-700 text-primary-50': ''}`}>
            {children}
        </button>
    )
}

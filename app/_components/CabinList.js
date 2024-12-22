import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore } from "next/cache";

export default async function CabinList ({filter}) {
    unstable_noStore()
    const cabins = await getCabins()

    if(!cabins.length){
        return null
    }

console.log("TEzt",filter)
    let filteredCabins
    if(filter === 'all'){
        filteredCabins = cabins
    }
    if(filter === 'small'){
        filteredCabins = cabins.filter(cabin=>cabin.maxCapacity<=2)
    }
    if(filter === 'medium'){
        filteredCabins = cabins.filter(cabin=>cabin.maxCapacity>2 &&cabin.maxCapacity<=7 )
    }
    if(filter === 'large'){
        filteredCabins = cabins.filter(cabin=>cabin.maxCapacity>7)
    }



   
    return(
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {filteredCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
          
    )
}

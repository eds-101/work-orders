import { NextPage } from 'next'
import { useState } from 'react'
import Image from 'next/image'
import logoOrange from '../public/logoOrange.png'
import Layout from '../components/Layout'
import Extra from '../components/FormFields/module'
import workOrders from '../components/FormFields/workOrders'
import brands from '../components/data/brands'

let extraFieldsLookup: any
extraFieldsLookup = {
  0: <Extra.Fields0 />,
  1: <Extra.Fields1 />,
  2: <Extra.Fields2 />,
  3: <Extra.Fields3 />,
  4: <Extra.Fields4 />,
  5: <Extra.Fields5 />,
  6: <Extra.Fields6 />,
  7: <Extra.Fields7 />,
  8: <Extra.Fields8 />,
  9: <Extra.Fields9 />,
  // 10: <Extra.Fields10 />,
  11: <Extra.Fields11 />,
  12: <Extra.Fields12 />,
  13: <Extra.Fields13 />,
  14: <Extra.Fields14 />,
  15: <Extra.Fields15 />,
  16: <Extra.Fields16 />,
  17: <Extra.Fields17 />,
  18: <Extra.Fields18 />,
}

const IndexPage: NextPage = () => {
  const [extraFields, setExtraFields] = useState("")
  
  const handleWorkOrder = (value: String) => {
    const index = workOrders.filter((x: any) => x.order === value)[0].index
    let component = extraFieldsLookup[String(index)]
    setExtraFields(component)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault() 
    let quantityOfItems = 0
    let quantityOfGiftSets = 0
    let hourlyRate = 0
    Array.prototype.forEach.call(e.target.elements, (element) => {
      console.log(element.id, "  ", element.value);
      if(element.id === "Arc Minute") {
        hourlyRate = brands.filter(brand => {
          brand.brandName === element.value
        })[0].hourlyRate
        quantityOfItems = element.value}
      if(element.id === "quantityOfItems") {quantityOfItems = element.value}
      if(element.id === "quantityOfGiftSets") {quantityOfGiftSets = element.value}
    })
    console.log("quantity of items: ", (quantityOfGiftSets + quantityOfItems), ",  ")
  }



  return (
    <Layout title="Submit Your Work Order | Tu Pack">
        <body className="bg-black">
            <div className="flex min-h-screen items-center justify-center">

                <div className="bg-white border border-none p-6 rounded-2xl">

                    <div className="mx-4 sm:mx-24 md:mx-34 lg:mx-56 mx-auto  flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
                            <div className="w-4/5">
                                <Image src={logoOrange} layout="responsive"  alt="pic" />
                                <h1 className="text-black text-center text-2xl">Submit Your Work Order</h1>
                            </div>

                        <form className="orderAuth flex flex-col  space-y-5 pt-4 pb-10" onSubmit={handleSubmit}>  
                            <h1 className="text-black text-2xl">Enter Your Details</h1>

                        <select required className="w-full p-2 rounded-md border"
                        name="brand" id="brand">
                            <option hidden disabled selected>Brand Name</option>
                            {brands.sort(function(a,b){
                              if(a.brandName < b.brandName) { return -1; }
                              if(a.brandName > b.brandName) { return 1; }
                              return 0;
                              }).map( 
                                    ({brandName})  =>  <option key={brandName} value={brandName}>{brandName}</option>
                                )
                            }
                        </select>
                               
                        <input required className="w-full p-2 rounded-md placeholder-black border"
                         id='name' placeholder="Your Name" type="text" />
                        
                        <input required className="w-full p-2 text-black placeholder-black rounded-md  border"
                         id='number' placeholder="Contact Number" type="tel" />

                        <label htmlFor="description">Choose a Work Order</label>
                        <select required className="w-full rounded-md  border"
                         name="order" id="orderMenu" onChange={(e) => handleWorkOrder(e.target.value)}>
                          <option hidden disabled selected>Select One, Enter Details and Submit</option>
                          {workOrders.sort(function(a,b){
                              if(a.order < b.order) { return -1; }
                              if(a.order > b.order) { return 1; }
                              return 0;
                              }).map( ({order})  =>  <option value={order}>{order}</option>
                          )}
                        </select>

                        {extraFields}
                        
                        <input className="w-full p-2 bg-black hover:bg-amber-500 rounded-full font-bold text-white hover:text-black border border-gray-700 cursor-pointer"
                            type="submit" />

                        </form>
                    </div>


                </div>

            </div>
    </body>

    </Layout>
  )
}

export default IndexPage



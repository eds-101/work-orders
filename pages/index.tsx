import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import logoOrange from '../public/logoOrange.png'
import Layout from '../components/Layout'
import Extra from '../components/FormFields/module'
import s3uploadFile from '../components/s3UploadFile'
import { supabase } from '../api'

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
  10: <Extra.Fields10 />,
  11: <Extra.Fields11 />,
  12: <Extra.Fields12 />,
  13: <Extra.Fields13 />,
  14: <Extra.Fields14 />,
  15: <Extra.Fields15 />,
  16: <Extra.Fields16 />,
  17: <Extra.Fields17 />,
}

const IndexPage: NextPage = () => {
  const [workOrdersList, setWorkOrdersList] = useState<Array<{name: string, id: number}> | null>([])
  const [loading, setLoading] = useState(true)
  const [extraFields, setExtraFields] = useState<String>("")
  
  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    const { data }: {data: Array<{name: string, id: number}> | null} = await supabase
      .from('work_orders')
      .select()
      setWorkOrdersList(data)
    setLoading(false)
  }

  const handleWorkOrder = (value: String) => {
    const component = extraFieldsLookup[String(value)]
    setExtraFields(component)
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault() 
    let id = "TUP" + (String(Date.now() * Math.floor(Math.random() * 100)).slice(-7))
    console.log("id: ", id)
    let email : string
    // console.log(e.target.elements)
      Array.prototype.forEach.call(e.target.elements, (element) => {
        if(element.id === "email") {email = element.value}
        else if(element.id.includes("SKU:")) {console.log("sku: " + element.id)}
        else if(element.id.includes("SKUs")) {null}
        else if(element.id === "upload") {
          interface FileObject {name: string}
          [...element.files].forEach((file: FileObject) => {
          console.log(file.name)
          s3uploadFile(file, email)
          })
        }
        else {
          console.log(element.id, " = ", element.value);
        }
      })
    }

  return (
    <Layout title="Submit Your Work Order | Tu Pack">
        <body className="bg-black">
            <div className="flex min-h-screen min-w-full items-center justify-center">

                <div className="bg-white border border-none p-6 rounded-2xl">

                    <div className="mx-4 sm:mx-14 md:mx-14 lg:mx-20  flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
                        <div className="w-4/5">
                            <Image src={logoOrange} layout="responsive"  alt="pic" />
                            <h1 className="text-black text-center text-2xl">Submit Your Work Order</h1>
                        </div>

                        <form encType='multipart/form-data'
                        className="orderAuth flex flex-col  space-y-5 pt-4 pb-10" onSubmit={handleSubmit}>  
                            <h1 className="text-black text-2xl">Enter Your Details</h1>

                        <input required className="w-full p-2 rounded-md placeholder-black border"
                          id='brand' placeholder="Enter Brand Name" type="text" />
                               
                        <input required className="w-full p-2 rounded-md placeholder-black border"
                         id='name' placeholder="Your Name" type="text" />
                        
                        <input className="w-full p-2 text-black placeholder-black rounded-md  border"
                         id='email' placeholder="Email Address" type="email" />

                        <input className="w-full p-2 text-black placeholder-black rounded-md  border"
                         id='number' placeholder="Contact Number" type="tel" />

                        <label htmlFor="description">Choose a Work Order</label>
                        {loading ? <p className="text-2xl">Loading ...</p> : null}
                        {workOrdersList ?
                        <select required className="w-full rounded-md  border"
                         name="order" id="orderMenu" onChange={(e) => handleWorkOrder(e.target.value)}>
                          <option hidden disabled selected>Select One, Enter Details and Submit</option>
                          {workOrdersList.sort(function(a,b){
                              if(a.name < b.name) { return -1; }
                              if(a.name > b.name) { return 1; }
                              return 0;
                              }).map( ({name, id})  =>  <option key={id} value={id}>{name}</option>
                          )}
                        </select>
                        : null
                      }
                        {extraFields}
                        <input className="w-full p-2 bg-black hover:bg-amber-500 rounded-full font-bold text-white border border-gray-700 cursor-pointer"
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



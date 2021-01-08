import React, { useState, useEffect } from 'react'
import { client } from './client'
import { cache } from './cache'

const getData = async () => {
  await client.get("/products/facemasks")
  await client.get("/products/beanies")
  await client.get("/products/gloves")
}

const getManufacturers = () => {
  
}

const App = () => {

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <div>
    yer
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useMemo, useState } from 'react';
import { FormInput } from './FormInput';
import DraggableProgressBar from './DraggableProgressBar';
import { FormSelect } from './FormSelect';
import Switch from 'react-switch';

let pokemons = [{ img: 'pok1.png', name: 'Balbasaur' }, { img: 'pok2.png', name: 'Charmander' }, { img: 'pok3.png', name: 'Squirtle' }]
let ballList = [
  { label: 'Poke Ball', value: 'Poke Ball', unitPrice: 5 },
  { label: 'Great Ball', value: 'Great Ball', unitPrice: 10 },
  { label: 'Super Portion', value: 'Super Portion', unitPrice: 10 },
  { label: 'Hyper Portion', value: 'Hyper Portion', unitPrice: 20 }
]

function App() {
  let [data, setData] = useState({ needBag: true })
  let [errors, setErrors] = useState({})
  let [itemsToPack, setItemsToPack] = useState([])
  let [addToCartModal, toggleAddToCartModal] = useState(false)

  function onChangeTxt(name, value) {

    setData({ ...data, [name]: value })
    setErrors({ ...errors, [name]: "" })
  }

  function handleValidation() {
    let err = {}

    if (!data.fullName || data.fullName?.trim()?.length < 3) {
      err["fullName"] = `Full name should have 3 characters atleast`
    }
    if (!data.codeName || data.codeName?.trim()?.length < 3) {
      err["codeName"] = `Code name should have 3 characters atleast`
    }
    if (!data.distanceInKms || data.distanceInKms < 0) {
      err['distanceInKms'] = `Distance should be greater than 0`
    }
    if (!data.startingRegion) {
      err['startingRegion'] = `Please select starting region`
    }
    if (!data.selectedPok) {
      err['selectedPok'] = `Select your pokemon`
    }
    if (!itemsToPack.length) {
      err['itemsToPack'] = `Select items to pack`
    }
    setErrors({ ...err })
    if (!Object.keys(err).length) {
      alert("Purchase Completed.., now page will reload")
      window.location.reload()
    }
  }


  let singleItemCost = useMemo(() => {
    let tempCost = 0
    if (data.selectedQuantity > 0 && data.selectedItem) {
      let unitPrice = ballList.find(i => i.label === data.selectedItem)?.["unitPrice"] / 1 || 0
      tempCost += (unitPrice * data.selectedQuantity)
    }
    if (data.needBag) {
      tempCost += 2
    }
    return tempCost
  }, [data.selectedItem, data.selectedQuantity, data.needBag])

  let totalCost = useMemo(() => {
    let tempCost = 0
    for (let index = 0; index < itemsToPack.length; index++) {
      let element = itemsToPack[index];
      tempCost += ballList.find(i => i.label === element.name)?.["unitPrice"] / 1 * element.quantity / 1
      if (element.bag) {
        tempCost += 2
      }
    }
    return tempCost
  }, [itemsToPack])

  function closeCartModal() {
    toggleAddToCartModal(false)
    setData({ ...data, selectedItem: undefined, needBag: true, selectedQuantity: 0, editIndex: undefined })
  }

  function handleValidationAddToCart() {
    let err = {}
    if (!data.selectedItem) {
      err["selectedItem"] = `Select Item`
    }
    if (!data.selectedQuantity || data.selectedQuantity < 0) {
      err['selectedQuantity'] = `Selected Quantity should be greater than 0`
    }
    setErrors({ ...err })
    if (!Object.keys(err).length) {
      let tempItemsToPack = itemsToPack
      if (data.editIndex) {
        tempItemsToPack[data.editIndex - 1] = { name: data.selectedItem, quantity: data.selectedQuantity, bag: data.needBag }
      }
      else {
        tempItemsToPack.push({ name: data.selectedItem, quantity: data.selectedQuantity, bag: data.needBag })
      }
      setItemsToPack([...tempItemsToPack])
      closeCartModal()
    }
  }

  return (
    <Box className='boxWithBg'
    >
      <Flex justify={'center'} alignItems={'center'} py={'4rem'}>
        <Box
          paddingY={'4.5rem'}
          paddingX={'5rem'}
          maxWidth="32rem"
          width="100%"
          // borderRadius="md"
          boxShadow="lg"
          borderRadius="16"
          bg="white"
        >
          <Text color={'#FE5454'} fontSize={32} fontWeight={'bold'} textAlign="center">Fill This Form</Text>
          <Text color={'#889296'} fontSize={18} fontWeight={'bold'} textAlign="center" my={'2rem'}>We'll use this info to dominate the poke world! Muhahahahah</Text>

          <FormControl mb={`2rem`}>
            <FormInput error={errors.fullName} name={'fullName'} label={'Full Name'} placeholder={'Input text'} onChangeTxt={onChangeTxt} value={data.fullName} />
          </FormControl>

          <FormControl mb={`3rem`}>
            <FormInput error={errors.codeName} name={'codeName'} label={'Code Name'} placeholder={'Input text'} onChangeTxt={onChangeTxt} value={data.codeName} />
          </FormControl>

          <DraggableProgressBar name={'distanceInKms'} value={data.distanceInKms || 0} onChangeTxt={onChangeTxt} sliderTxt={`How far is your nearest pokemon center?: ${data.distanceInKms || 0} KMS`} />
          {errors.distanceInKms ? <Text color="#FE5454" ml={4} fontSize={12} pt={'0.3rem'} fontWeight={'normal'}>{errors.distanceInKms}</Text> : null}

          <FormControl my={`2rem`}>
            <FormSelect
              options={[
                { label: 'Kanto', value: 'Kanto' },
                { label: 'Jhoto', value: 'Jhoto' },
                { label: 'Hoenn', value: 'Hoenn' }
              ]}
              error={errors.startingRegion} name={'startingRegion'} label={`What's your starting region?`} placeholder={''} onChangeTxt={onChangeTxt} value={data.startingRegion} />
          </FormControl>


          <Text my={'1rem'} color={'#00000099'} fontSize={16} fontWeight={'normal'} textAlign="left">Choose your starter pokemon</Text>

          <Flex justifyContent={'space-between'}>
            {pokemons.map((i, j) => {
              return <Box alignItems={'center'} justifyContent={'center'}
                h={data.selectedPok === i.name ? '100px' : "80px"} w={data.selectedPok === i.name ? '100px' : "80px"}
                display={'flex'}
                onClick={() => {
                  setData({ ...data, selectedPok: i.name })
                  setErrors({ ...errors, selectedPok: "" })
                }}
                className='cursor' borderRadius={"1000"}
                border={data.selectedPok === i.name ? '1px solid #FE5454' : ''}
                background={'#F0F0F0'}>
                <img height={'100%'} width={'100%'} src={`/images/${i.img}`} />
              </Box>
            })}
          </Flex>

          {errors.selectedPok ? <Text color="#FE5454" ml={4} fontSize={12} pt={'0.3rem'} fontWeight={'normal'}>{errors.selectedPok}</Text> : null}

          <Flex mt={`2rem`} justifyContent={'space-between'} alignItems={'center'} >
            <Text color={'#00000099'} fontSize={16} fontWeight={'normal'} textAlign="left">What do you want to pack?</Text>
            <Text
              onClick={() => {
                toggleAddToCartModal(true)
              }} className='cursor'
              width={"40px"} height={"40px"} style={{ display: 'flex' }} justifyContent={'center'} color={'white'} fontSize={"25px"} fontWeight={'normal'}
              bg={'#FE5454'} borderRadius={100} alignItems={'center'} >+</Text>
          </Flex>
          {errors.itemsToPack ? <Text color="#FE5454" ml={4} fontSize={12} pt={'0.3rem'} fontWeight={'normal'}>{errors.itemsToPack}</Text> : null}

          <Flex my={`1rem`} justifyContent={'space-between'} flexWrap={'wrap'} width={'80%'}>
            {itemsToPack.map((i, j) => {
              return <Flex
                className='cursor' mb={'1rem'} paddingX={'0.6rem'} paddingY={'0.3rem'} width={'48%'} bg={i.bag ? '#75F4FE' : '#DFDFDF'} borderRadius={20} alignItems={'center'} >
                <Text
                  onClick={() => {
                    setData({ ...data, editIndex: j + 1, selectedItem: i.name, selectedQuantity: i.quantity, needBag: i.bag })
                    toggleAddToCartModal(true)
                  }}
                  fontSize={14} color={'#000000DE'}>{`${i.quantity} ${i.name}`}</Text>
                <Text
                  onClick={() => {
                    let tempItemsToPack = itemsToPack
                    tempItemsToPack = tempItemsToPack.filter((l, m) => {
                      return j != m
                    })
                    setItemsToPack([...tempItemsToPack])
                  }}
                  ml={'auto'} width={"14px"} height={"14px"} style={{ display: 'flex' }} justifyContent={'center'} color={'white'} fontSize={"12px"} fontWeight={'normal'}
                  bg={'#00000099'} borderRadius={100} alignItems={'center'} >x</Text>
              </Flex>
            })}
          </Flex>

          <Flex my={`2rem`} alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'#889296'} fontSize={18} fontWeight={'bold'}>Total Cost</Text>
            <Text color={'#393B3B'} fontSize={18} fontWeight={'bold'}>{`$ ${totalCost}`}</Text>
          </Flex>

          <Flex justifyContent={'center'}>
            <Button
              onClick={handleValidation}
              w={`65%`} color={"#fff"} bg={'#FE5454'} fontWeight={'medium'} fontSize={'14'} >
              START MY JOURNEY
            </Button>
          </Flex>
        </Box>
      </Flex>

      {/* Modal code  */}
      {addToCartModal ? <Modal borderRadius={16} isOpen={addToCartModal} onClose={closeCartModal}>
        <ModalOverlay />
        <ModalContent
          paddingY={'2rem'}
          paddingX={'2rem'}>
          <ModalCloseButton />
          <ModalBody>
            <Text my={'2rem'} color={'#FE5454'} fontSize={32} fontWeight={'bold'} textAlign="center">{data.editIndex ? `Edit Your Order` : `Place Your Order`}</Text>
            <Text mb={`2rem`} color={'#889296'} fontSize={18} fontWeight={'bold'} textAlign="center">We'll use this info to dominate the poke world! Muhahahahah</Text>
            <FormControl mb={`2rem`}>
              <FormSelect
                options={ballList}
                error={errors.selectedItem} name={'selectedItem'} label={`Choose Item`} placeholder={''} onChangeTxt={onChangeTxt} value={data.selectedItem} />
            </FormControl>

            <DraggableProgressBar name={'selectedQuantity'} value={data.selectedQuantity || 0} onChangeTxt={onChangeTxt}
              sliderTxt={`Selected Quantity: ${data.selectedQuantity || 0}`}
            />
            {errors.selectedQuantity ? <Text color="#FE5454" ml={4} fontSize={12} pt={'0.3rem'} fontWeight={'normal'}>{errors.selectedQuantity}</Text> : null}

            <Flex my={`2rem`} justifyContent={'space-between'} alignItems={'center'}>
              <Text fontSize={16} color={'#00000099'} fontWeight={'normal'}>I need a bag for that!</Text>

              <Switch
                checked={data.needBag}
                onChange={() => {
                  setData({ ...data, needBag: !data.needBag })
                }}
                offColor="#ccc"
                onColor={'#FFB6C1'}
                uncheckedIcon={false}
                checkedIcon={false}
                height={10}
                width={40}
                handleDiameter={20}
                handleColor={data.needBag ? "#FE5454" : "#7A7A7A"}
                onHandleColor="#FE5454"
                offHandleColor='#7A7A7A'
              />
            </Flex>

            <Flex my={`2rem`} alignItems={'center'} justifyContent={'space-between'}>
              <Text color={'#889296'} fontSize={18} fontWeight={'bold'}>Cost:</Text>
              <Text color={'#393B3B'} fontSize={18} fontWeight={'bold'}>{`$ ${singleItemCost}`}</Text>
            </Flex>

            <Flex justifyContent={'center'}>
              <Button
                onClick={handleValidationAddToCart}
                w={"12rem"} color={"#fff"} bg={'#FE5454'} fontWeight={'medium'} fontSize={'14'} >
                {data.editIndex ? `MODIFY CART` : `ADD TO CART`}
              </Button>
            </Flex>

          </ModalBody>
        </ModalContent>
      </Modal> : null}
    </Box>
  );
}

export default App;
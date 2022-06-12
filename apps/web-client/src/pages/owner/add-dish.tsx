import { useState } from "react"

import { gql, useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { MY_RESTAURANT_QUERY } from "pages/owner/my-restaurant"
import { useForm } from "react-hook-form"

import { useCreateDishMutation } from "apps/web-client/src/__generated__/types.react-apollo"

import { Button } from "../../components/button"

interface FormProps {
  name: string
  price: string
  description: string
  [key: string]: string
}

export const AddDish = () => {
  const { restaurantId } = useParams<IParams>()
  const history = useRouter()
  const [createDishMutation, { loading }] = useCreateDishMutation({
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: +restaurantId,
          },
        },
      },
    ],
  })
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormProps>({ mode: "onChange" })
  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues()
    const optionObjects = optionsNumber.map(theId => ({
      name: rest[`${theId}-optionName`],
      extra: +rest[`${theId}-optionExtra`],
    }))
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
          options: optionObjects,
        },
      },
    })

    history.goBack()
  }

  const [optionsNumber, setOptionsNumber] = useState<number[]>([])
  const onAddOptionClick = () => {
    setOptionsNumber(current => [Date.now(), ...current])
  }
  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber(current => current.filter(id => id !== idToDelete))
    setValue(`${idToDelete}-optionName`, "")
    setValue(`${idToDelete}-optionExtra`, "")
  }

  return (
    <div className="container mt-52 flex flex-col items-center">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <h4 className="mb-3 text-2xl font-semibold">Add Dish</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 mb-5 grid w-full max-w-screen-sm gap-3"
      >
        <input
          {...register("name", {
            required: "Name is required",
          })}
          type="text"
          placeholder="Name"
          className="input"
        />
        <input
          {...register("price", {
            required: "Price is required",
          })}
          min={0}
          type="number"
          placeholder="Price"
          className="input"
        />
        <input
          {...register("description", {
            required: "Description Name is required",
          })}
          type="text"
          placeholder="Description"
          className="input"
        />
        <div className="my-10">
          <h4 className="mb-3 text-lg font-medium">Dish Options</h4>
          <span
            onClick={onAddOptionClick}
            className="mt-5 cursor-pointer bg-gray-900 py-1 px-2 text-white "
          >
            Add Dish Option
          </span>
          {optionsNumber.length !== 0 &&
            optionsNumber.map(id => (
              <div key={id} className="mt-5">
                <input
                  {...register(`${id}-optionName`)}
                  className="mr-3 border-2 py-2 px-4 focus:border-gray-600 focus:outline-none"
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  {...register(`${id}-optionExtra`)}
                  className="w-36 border-2 py-2 px-4 focus:border-gray-600 focus:outline-none"
                  type="number"
                  min={0}
                  placeholder="Option Extra"
                />
                <span
                  className="ml-3 mt-5 cursor-pointer bg-red-500 py-3 px-4 text-white"
                  onClick={() => onDeleteClick(id)}
                >
                  Delete Option
                </span>
              </div>
            ))}
        </div>

        <Button loading={loading} canClick={isValid} actionText="Create Dish" />
      </form>
    </div>
  )
}

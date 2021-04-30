import { VFC } from 'react'
import {
  Category,
  CookMethod,
  CookTimeUnit,
  Ingredient,
  Recipe,
  Step,
  Unit,
} from '../../api'
import { CLOSE_SOURCE, Drawer, DrawerProps } from 'baseui/drawer'
import { useGetRecipe, useListCategories } from '../../api/queries'
import { FastField, FastFieldProps, Form, Formik } from 'formik'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { Select } from 'baseui/select'
import { Card, StyledAction, StyledBody } from 'baseui/card'
import { Block } from 'baseui/block'
import { Button, KIND, SIZE } from 'baseui/button'
import { DeleteAlt, Plus } from 'baseui/icon'
import { arrayMove, arrayRemove, List } from 'baseui/dnd-list'
import { useCreateRecipe, useUpdateRecipe } from '../../api/mutations'
import * as Yup from 'yup'
import { useStyletron } from 'baseui'
import { cookMethodLabels } from './cookMethods'
import { unitLabels } from './unitLabels'
import { ImageField, InputField, SelectField, TextareaField } from '../Form'

const validationSchema = Yup.object({
  title: Yup.string().required('Recipe title is required'),
})

export type DrawerFormProps = Pick<Recipe, 'id'> & DrawerProps

export const DrawerForm: VFC<DrawerFormProps> = ({ id, ...drawerProps }) => {
  const [, theme] = useStyletron()
  const { data: { pages } = { pages: [] } } = useListCategories({ limit: 100 })
  const { data: activeRecipe } = useGetRecipe({ id })
  const createRecipe = useCreateRecipe()
  const updateRecipe = useUpdateRecipe()

  return (
    <Drawer {...drawerProps}>
      <Formik<
        Partial<Exclude<Recipe, '__typename' | 'createdAt' | 'updatedAt'>>
      >
        initialValues={activeRecipe}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (recipe) => {
          if ('id' in recipe && recipe.id) {
            await updateRecipe.mutateAsync(recipe)
            drawerProps.onClose({ closeSource: CLOSE_SOURCE.closeButton })
            return
          }

          await createRecipe.mutateAsync(recipe as Omit<typeof recipe, 'id'>)
          drawerProps.onClose({ closeSource: CLOSE_SOURCE.closeButton })
        }}
      >
        {({ touched, errors }) => {
          return (
            <Form>
              <ImageField name="image" />
              <InputField name="title" label="Title" required />
              <TextareaField name="description" label="Description" />
              <SelectField
                name="category"
                label="Category"
                options={pages.flatMap(({ items = [] }) =>
                  items.map((category) => ({
                    id: category.id,
                    label: category.name,
                    value: category,
                  })),
                )}
                value={(value: Category) =>
                  (value && [
                    {
                      id: value.id,
                      label: value.name,
                      value,
                    },
                  ]) ||
                  []
                }
              />
              <FastField name="keywords">
                {({
                  meta: { touched, error },
                  field,
                  form: { setFieldValue },
                }: FastFieldProps<string[]>) => (
                  <FormControl label="Keywords" error={touched && error}>
                    <Select
                      {...field}
                      multi
                      creatable
                      labelKey="label"
                      valueKey="id"
                      value={(field.value ?? []).map((keyword) => ({
                        id: keyword,
                        label: keyword,
                      }))}
                      options={(field.value ?? []).map((keyword) => ({
                        id: keyword,
                        label: keyword,
                      }))}
                      onChange={({ value }) => {
                        setFieldValue(
                          field.name,
                          (value ?? []).map(({ label }) => label),
                        )
                      }}
                    />
                  </FormControl>
                )}
              </FastField>
              <SelectField
                name="cookMethods"
                label="Cook Methods"
                multi
                options={Object.entries(cookMethodLabels).map(
                  ([id, label]) => ({
                    id,
                    label,
                    value: id,
                  }),
                )}
                value={(value: CookMethod[] = []) =>
                  value?.map(
                    (method) =>
                      ({
                        id: method,
                        label: cookMethodLabels[method],
                        value: method,
                      } ?? []),
                  )
                }
              />
              <FormControl
                label="Prep Time"
                error={touched?.cookTime && errors?.cookTime}
              >
                <Block display="flex">
                  <Block flex="1 0 auto">
                    <FastField name="prepTime">
                      {({
                        meta: { touched, error },
                        field,
                      }: FastFieldProps<number>) => (
                        <Input
                          {...field}
                          type="number"
                          min={1}
                          step={0.25}
                          error={Boolean(touched && error)}
                        />
                      )}
                    </FastField>
                  </Block>
                  <Block>
                    <FastField name="prepTimeUnit">
                      {({ field, form: { setFieldValue } }) => {
                        return (
                          <Select
                            clearable={false}
                            options={[
                              {
                                id: CookTimeUnit.HOURS,
                                label: 'hours',
                              },
                              {
                                id: CookTimeUnit.MINUTES,
                                label: 'minutes',
                              },
                            ]}
                            value={
                              field.value
                                ? [
                                    {
                                      id: field.value,
                                      label:
                                        field.value === CookTimeUnit.HOURS
                                          ? 'hours'
                                          : 'minutes',
                                    },
                                  ]
                                : [
                                    {
                                      id: CookTimeUnit.MINUTES,
                                      label: 'minutes',
                                    },
                                  ]
                            }
                            onChange={({ value: [value] }) => {
                              setFieldValue(field.name, value.id)
                            }}
                          />
                        )
                      }}
                    </FastField>
                  </Block>
                </Block>
              </FormControl>

              <FormControl
                label="Cook Time"
                error={touched?.cookTime && errors?.cookTime}
              >
                <Block display="flex">
                  <Block flex="1 0 auto">
                    <FastField name="cookTime">
                      {({
                        meta: { touched, error },
                        field,
                      }: FastFieldProps<number>) => (
                        <Input
                          {...field}
                          type="number"
                          min={1}
                          step={0.25}
                          error={Boolean(touched && error)}
                        />
                      )}
                    </FastField>
                  </Block>
                  <Block>
                    <FastField name="cookTimeUnit">
                      {({ field, form: { setFieldValue } }) => {
                        return (
                          <Select
                            clearable={false}
                            options={[
                              {
                                id: CookTimeUnit.HOURS,
                                label: 'hours',
                              },
                              {
                                id: CookTimeUnit.MINUTES,
                                label: 'minutes',
                              },
                            ]}
                            value={
                              field.value
                                ? [
                                    {
                                      id: field.value,
                                      label:
                                        field.value === CookTimeUnit.HOURS
                                          ? 'hours'
                                          : 'minutes',
                                    },
                                  ]
                                : [
                                    {
                                      id: CookTimeUnit.MINUTES,
                                      label: 'minutes',
                                    },
                                  ]
                            }
                            onChange={({ value: [value] }) => {
                              setFieldValue(field.name, value.id)
                            }}
                          />
                        )
                      }}
                    </FastField>
                  </Block>
                </Block>
              </FormControl>
              <FastField name="servings">
                {({
                  meta: { touched, error },
                  field,
                }: FastFieldProps<number>) => (
                  <FormControl label="Servings" error={touched && error}>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      error={Boolean(touched && error)}
                    />
                  </FormControl>
                )}
              </FastField>
              <FastField name="ingredients">
                {({
                  field: { value = [], name },
                  form: { setFieldValue },
                }: FastFieldProps<Ingredient[]>) => (
                  <Card title="Ingredients">
                    <StyledBody>
                      <Block
                        display="grid"
                        gridTemplateColumns="1fr 1fr 5fr auto"
                        gridGap={theme.sizing.scale100}
                      >
                        {value?.map((ingredient, index) => (
                          <>
                            <InputField
                              name={`${name}[${index}].measurement`}
                              type="number"
                              min={0.125}
                              step={0.125}
                              size={SIZE.compact}
                            />
                            <SelectField
                              name={`${name}[${index}].unit`}
                              options={Object.entries(unitLabels).map(
                                ([id, label]) => ({
                                  id,
                                  label,
                                  value: id,
                                }),
                              )}
                              value={(value?: Unit) =>
                                value
                                  ? [
                                      {
                                        id: value,
                                        label: unitLabels[value],
                                        value: id,
                                      },
                                    ]
                                  : undefined
                              }
                              size={SIZE.compact}
                              clearable={true}
                              openOnClick={true}
                            />
                            <InputField
                              name={`${name}[${index}].description`}
                              size={SIZE.compact}
                              required
                            />
                            {value?.length > 1 ? (
                              <Button
                                type="button"
                                kind={KIND.minimal}
                                size={SIZE.compact}
                                onClick={() =>
                                  setFieldValue(
                                    name,
                                    value?.filter((v, i) => i !== index),
                                  )
                                }
                              >
                                <DeleteAlt />
                              </Button>
                            ) : (
                              <div />
                            )}
                          </>
                        ))}
                      </Block>
                    </StyledBody>
                    <StyledAction>
                      <Button
                        type="button"
                        kind={KIND.secondary}
                        onClick={() =>
                          setFieldValue('ingredients', [
                            ...value,
                            { measurement: 1, unit: Unit.CUP, description: '' },
                          ])
                        }
                        $style={{
                          width: '100%',
                        }}
                      >
                        <Plus /> Add Ingredient
                      </Button>
                    </StyledAction>
                  </Card>
                )}
              </FastField>
              <Block paddingTop={theme.sizing.scale600}>
                <FastField name="steps">
                  {({
                    field: { name, value = [] },
                    form: { setFieldValue },
                  }: FastFieldProps<Step[]>) => (
                    <Card title="Steps">
                      <StyledBody>
                        <List
                          removable={value.length > 1}
                          removableByMove={value.length > 1}
                          items={value
                            ?.sort((a, b) => {
                              if (a.order > b.order) return 1
                              if (a.order < b.order) return -1
                              return 0
                            })
                            .map((step, index) => (
                              <TextareaField
                                name={`${name}[${index}].instruction`}
                              />
                            ))}
                          onChange={({ oldIndex, newIndex }) => {
                            const updated =
                              newIndex === -1
                                ? arrayRemove<Step>(value, oldIndex)
                                : arrayMove<Step>(value, oldIndex, newIndex)

                            setFieldValue(
                              name,
                              updated.map(({ instruction }, index) => ({
                                instruction,
                                order: index,
                              })),
                            )
                          }}
                        />
                      </StyledBody>
                      <StyledAction>
                        <Button
                          type="button"
                          kind={KIND.secondary}
                          onClick={() =>
                            setFieldValue(name, [
                              ...value,
                              { instruction: '', order: value.length },
                            ])
                          }
                          $style={{
                            width: '100%',
                          }}
                        >
                          <Plus /> Add Step
                        </Button>
                      </StyledAction>
                    </Card>
                  )}
                </FastField>
              </Block>
              <Block paddingTop={theme.sizing.scale600}>
                <Button
                  type="submit"
                  isLoading={createRecipe.isLoading || updateRecipe.isLoading}
                  $style={{
                    width: '100%',
                  }}
                >
                  {activeRecipe?.id ? 'Update' : 'Create'}
                </Button>
              </Block>
            </Form>
          )
        }}
      </Formik>
    </Drawer>
  )
}

import { FC, useState } from 'react'
import { useListCategories } from '../../api/queries'
import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '../../api/mutations'
import { Category } from '../../api'
import { Block } from 'baseui/block'
import { HeadingMedium } from 'baseui/typography'
import { Button, KIND, SIZE } from 'baseui/button'
import { Delete, Plus } from 'baseui/icon'
import { Drawer } from 'baseui/drawer'
import { FastField, Form, Formik } from 'formik'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
} from 'baseui/modal'
import { Spinner } from 'baseui/spinner'
import { Table } from 'baseui/table'
import * as Yup from 'yup'
import { ScrollPagination } from '../ScrollPagination'

export type CategoriesTabProps = {
  readonly initialData?: Category[]
}

const validationSchema = Yup.object({
  name: Yup.string().required('Category name is required'),
})

export const CategoriesTab: FC<CategoriesTabProps> = () => {
  const {
    data: { pages } = { pages: [] },
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useListCategories()
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  const [activeCategory, setActiveCategory] = useState<Omit<
    Category,
    '__typename'
  > | null>(null)
  const [
    confirmDeleteCategory,
    setConfirmDeleteCategory,
  ] = useState<Category | null>(null)

  return (
    <>
      <Block display="grid" gridTemplateColumns={'1fr auto'}>
        <Block>
          <HeadingMedium>Categories</HeadingMedium>
        </Block>
        <Block alignSelf="center">
          <Button size={SIZE.compact} onClick={() => setActiveCategory({})}>
            <Plus />
            Add Category
          </Button>
        </Block>
      </Block>

      <Drawer
        isOpen={activeCategory !== null}
        onClose={() => setActiveCategory(null)}
      >
        <Formik<Category | {}>
          initialValues={activeCategory}
          validationSchema={validationSchema}
          onSubmit={async (category) => {
            if ('id' in category && category.id) {
              await updateCategory.mutateAsync(category)
              setActiveCategory(null)
              return
            }

            await createCategory.mutateAsync(category)
            setActiveCategory(null)
          }}
        >
          <Form>
            <FastField name="name">
              {({ meta: { touched, error }, field }) => (
                <FormControl label="Category" error={touched && error}>
                  <Input {...field} error={touched && error} />
                </FormControl>
              )}
            </FastField>
            <Button
              type="submit"
              isLoading={createCategory.isLoading || updateCategory.isLoading}
              $style={{
                width: '100%',
              }}
            >
              {activeCategory?.id ? 'Update' : 'Create'}
            </Button>
          </Form>
        </Formik>
      </Drawer>

      <Modal
        isOpen={confirmDeleteCategory !== null}
        onClose={() => setConfirmDeleteCategory(null)}
      >
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete "{confirmDeleteCategory?.name}"?
        </ModalBody>
        <ModalFooter>
          <ModalButton
            kind={KIND.tertiary}
            onClick={() => setConfirmDeleteCategory(null)}
          >
            Cancel
          </ModalButton>
          <ModalButton
            autoFocus
            isLoading={deleteCategory.isLoading}
            onClick={() => {
              deleteCategory
                .mutateAsync(confirmDeleteCategory)
                .then(() => setConfirmDeleteCategory(null))
            }}
          >
            Delete
          </ModalButton>
        </ModalFooter>
      </Modal>

      {isLoading && <Spinner />}

      {isSuccess && (
        <Block>
          {!!pages.length && (
            <Table
              columns={['Category', '']}
              data={pages.flatMap(({ items = [] }) =>
                items.map((category) => [
                  category.name,
                  <Block display="flex" justifyContent="flex-end" width="100%">
                    <Button
                      kind={KIND.minimal}
                      onClick={() => setActiveCategory(category)}
                      size={SIZE.compact}
                    >
                      Edit
                    </Button>
                    <Button
                      kind={KIND.minimal}
                      size={SIZE.compact}
                      onClick={() => setConfirmDeleteCategory(category)}
                    >
                      <Delete />
                    </Button>
                  </Block>,
                ]),
              )}
            />
          )}
          {!pages.length && 'No categories have been added yet'}
          <ScrollPagination
            onPage={fetchNextPage}
            loading={isLoading}
            complete={!hasNextPage}
          />
        </Block>
      )}
    </>
  )
}

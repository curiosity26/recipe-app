import { useState, VFC } from 'react'
import { Recipe } from '../../api'
import { useListCategories, useListRecipes } from '../../api/queries'
import { Block } from 'baseui/block'
import { HeadingMedium } from 'baseui/typography'
import { Button, KIND, SIZE } from 'baseui/button'
import { Delete, Plus } from 'baseui/icon'
import { Table } from 'baseui/table'
import { useDeleteRecipe } from '../../api/mutations'
import { DrawerForm } from './DrawerForm'
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
} from 'baseui/modal'
import { useRouter } from 'next/router'
import { ScrollPagination } from '../ScrollPagination'

export const RecipeTab: VFC = () => {
  const router = useRouter()
  const {
    data: { pages } = { pages: [] },
    isSuccess,
    fetchNextPage,
  } = useListRecipes()
  const categories = useListCategories()
  const deleteRecipe = useDeleteRecipe()

  const [activeRecipe, setActiveRecipe] = useState<Omit<
    Recipe,
    '__typename' | 'createdAt' | 'updatedAt'
  > | null>(null)
  const [confirmDeleteRecipe, setConfirmDeleteRecipe] = useState<Recipe | null>(
    null,
  )

  return (
    <>
      <Block display="grid" gridTemplateColumns={'1fr auto'}>
        <Block>
          <HeadingMedium>Recipes</HeadingMedium>
        </Block>
        <Block alignSelf="center">
          <Button size={SIZE.compact} onClick={() => setActiveRecipe({})}>
            <Plus />
            Add Recipe
          </Button>
        </Block>
      </Block>

      <DrawerForm
        id={activeRecipe?.id}
        isOpen={activeRecipe !== null}
        onClose={() => setActiveRecipe(null)}
        size="full"
      />

      <Modal
        isOpen={confirmDeleteRecipe !== null}
        onClose={() => setConfirmDeleteRecipe(null)}
      >
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete "{confirmDeleteRecipe?.title}"?
        </ModalBody>
        <ModalFooter>
          <ModalButton
            kind={KIND.tertiary}
            onClick={() => setConfirmDeleteRecipe(null)}
          >
            Cancel
          </ModalButton>
          <ModalButton
            autoFocus
            isLoading={deleteRecipe.isLoading}
            onClick={() => {
              deleteRecipe
                .mutateAsync(confirmDeleteRecipe)
                .then(() => setConfirmDeleteRecipe(null))
            }}
          >
            Delete
          </ModalButton>
        </ModalFooter>
      </Modal>

      {isSuccess && (
        <Block>
          {!!pages.length && (
            <Table
              columns={['Recipe', '']}
              data={pages.flatMap(({ items = [] }) =>
                items.map((recipe) => [
                  recipe.title,
                  <Block display="flex" justifyContent="flex-end" width="100%">
                    <Button
                      kind={KIND.minimal}
                      size={SIZE.compact}
                      onClick={() => router.push(`/recipe/${recipe.id}`)}
                    >
                      View
                    </Button>
                    <Button
                      kind={KIND.minimal}
                      size={SIZE.compact}
                      onClick={() => setActiveRecipe(recipe)}
                    >
                      Edit
                    </Button>
                    <Button
                      kind={KIND.minimal}
                      size={SIZE.compact}
                      onClick={() => setConfirmDeleteRecipe(recipe)}
                    >
                      <Delete />
                    </Button>
                  </Block>,
                ]),
              )}
            />
          )}
          {!pages.length && 'No recipes have been added yet'}
          <ScrollPagination onPage={fetchNextPage} />
        </Block>
      )}
    </>
  )
}

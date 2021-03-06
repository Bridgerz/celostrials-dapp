import {
  Container,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"
import { memo } from "react"

interface StakeProps {
  isOpen: boolean
  onClose: () => void
}

export const StakeModal = memo(({ isOpen, onClose }: StakeProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInRight"
    >
      <ModalOverlay bg="black.blur" backdropFilter="blur(10px)" />
      <ModalContent></ModalContent>
    </Modal>
  )
})

StakeModal.displayName = "StakeModal"

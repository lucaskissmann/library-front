'use client'

import { useEffect, useState } from 'react'
import { Modal } from '../ui/modal'

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
	title: string;
  description: string;
  children: React.ReactNode;
}
const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
	title,
  description,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
    </Modal>
  )
}

export default UpdateModal

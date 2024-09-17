'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Modal } from '../ui/modal'
import AuthorForm from '../author-form';
import { Author } from '@/types/Author';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
	title: string;
  description: string;
	data: Author;
}
const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
	title,
  description,
	data,
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
			<AuthorForm initialData={data} onClose={onClose} isEdit={true} />
    </Modal>
  )
}

export default UpdateModal

'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Modal } from '../ui/modal'

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  description: string;
}
const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  description,
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
      title="Você tem certeza?"
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="cancel" onClick={onClose}>
          Cancelar
        </Button>
        <Button disabled={loading} variant="confirm" onClick={onConfirm}>
          Confirmar
        </Button>
      </div>
    </Modal>
  )
}

export default AlertModal
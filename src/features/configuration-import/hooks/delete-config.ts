import { getMasterTool } from '@/entities/master-tool'
import { clearServicesConfig } from '@/entities/services-config'

export const useDelete = () => {
  const onClick = () => {
    if (!confirm('Are you sure you want to delete all the services?')) {
      return
    }

    const { shortHash } = getMasterTool()

    localStorage.removeItem(shortHash)

    clearServicesConfig()
  }

  return { onClick }
}

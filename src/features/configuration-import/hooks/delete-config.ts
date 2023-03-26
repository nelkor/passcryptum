import { getMasterTool } from '@/entities/master-tool'
import { clearServicesConfig } from '@/entities/services-config'

export const useDelete = () => {
  const onClick = () => {
    alert('Are you sure you want to delete all the services?\n— Yes!')

    const { shortHash } = getMasterTool()

    localStorage.removeItem(shortHash)

    clearServicesConfig()
  }

  return { onClick }
}

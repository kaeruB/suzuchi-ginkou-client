import * as React from 'react'
import { VFC } from 'react'
import EntertainmentIcon from '/public/icons/entertainment.svg'
import HealthIcon from '/public/icons/health.svg'
import HomeIcon from '/public/icons/home.svg'
import ShoppingIcon from '/public/icons/shopping.svg'
import OtherIcon from '/public/icons/other.svg'
import DeleteIcon from '/public/icons/trashbin.svg'
import EditIcon from '/public/icons/edit.svg'
import { Category, IconId } from '../../types/bankState'

type IconFactoryProps = {
  iconId: Category | IconId
  size: number
}
export const IconFactory: VFC<IconFactoryProps> = (props: IconFactoryProps) => {
  const renderIcon = () => {
    switch (props.iconId) {
      case Category.ENTERTAINMENT:
        return <EntertainmentIcon />
      case Category.HEALTH:
        return <HealthIcon />
      case Category.HOME:
        return <HomeIcon />
      case Category.SHOPPING:
        return <ShoppingIcon />
      case Category.OTHER:
        return <OtherIcon />
      case IconId.DELETE:
        return <DeleteIcon />
      case IconId.EDIT:
        return <EditIcon />
    }
  }
  return <div style={{ width: `${props.size}rem` }}>{renderIcon()}</div>
}

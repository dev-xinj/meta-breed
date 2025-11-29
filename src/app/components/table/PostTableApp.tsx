import React from 'react'
import { DataTableApp } from './DataTableApp'
import { PostPageData } from '@/app/mock/posts.data'
import { postColumns } from '@/domain/posts/post.columns'

export default function PostTableApp() {
  return (
    <DataTableApp filter="title" columns={postColumns} data={PostPageData}></DataTableApp>
  )
}

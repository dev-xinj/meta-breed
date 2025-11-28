type Props = {
  params: {
    accId: string;
  };
};
export default function PostPage({ params }: Props) {
  return <div>The dynamic route is {params.accId}</div>
}
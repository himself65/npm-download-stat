import { permanentRedirect } from "next/navigation";

type Props = {
  params: {
    pkg: string;
    invalid: string;
  };
};

export const dynamic = "force-static";
export const runtime = "edge";

export default function Page(props: Props) {
  const { params } = props;
  const newPkg = encodeURIComponent(
    `${decodeURIComponent(params.pkg)}/${params.invalid}`,
  );
  permanentRedirect(`/${newPkg}`);
}

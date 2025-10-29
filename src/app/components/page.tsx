import Button from "@/components/Button/Button";
import TextInput from "@/components/Input/TextInput/TextInput";

export default function ComponentsPage() {
  return (
    <main>
      <TextInput type={"text"} placeholder={""} />
      <Button type={"button"}>클릭!</Button>
    </main>
  );
}

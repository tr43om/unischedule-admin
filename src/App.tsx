import GlobalStyle from "./styles";
import { Button, Container, FormLabel } from "@mui/material";
import {
  SelectGroupField,
  SelectWeekField,
  SelectWeekdayField,
  SelectLessonForm,
} from "./components";
import { useForm, DefaultValues } from "react-hook-form";
import { FormControl } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Stack from "@mui/material/Stack";

type FormValues = {
  groupID: string;
};
function App() {
  const defaultValues: DefaultValues<FormValues> = {
    groupID: "",
  };
  const { handleSubmit, control } = useForm<{ groupID: string }>({
    defaultValues,
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <Container>
      <GlobalStyle />
      <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
        <FormLabel sx={{ mb: 3 }}>
          Заполните поля ниже, чтобы добавить новую пару
        </FormLabel>
        <Stack spacing={3} sx={{ mb: 3 }}>
          <SelectGroupField />
          <SelectWeekField />
          <SelectWeekdayField />
          <SelectLessonForm />
        </Stack>

        <Button type="submit" variant="contained" sx={{ maxWidth: "200px" }}>
          Добавить
        </Button>
      </FormControl>
    </Container>
  );
}

export default App;

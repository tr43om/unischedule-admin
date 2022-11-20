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
import { FormValues } from "./types";

function App() {
  const defaultValues: DefaultValues<FormValues> = {
    groupID: "",
    weeks: [],
    weekday: "",
    professorsAndAuditories: [{}, {}],
    subject: "",
    start: new Date(),
  };
  const { handleSubmit, control, getValues } = useForm<FormValues>({
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
          <SelectGroupField control={control} />
          <SelectWeekField control={control} />
          <SelectWeekdayField control={control} />
          <SelectLessonForm control={control} />
        </Stack>

        <Button
          type="submit"
          variant="contained"
          sx={{ maxWidth: "200px" }}
          onClick={onSubmit}
        >
          Добавить
        </Button>
      </FormControl>
    </Container>
  );
}

export default App;

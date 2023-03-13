import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import useTranslation from "next-translate/useTranslation";
import { getText } from "../../services/getApis";
import SideBar from '../../components/SideBar';
import ProtectedRoute from '../../components/ProtectedRoute';
import styled from "styled-components";

export const Estilo = styled.div`
  .ql-toolbar.ql-snow, 
  .ql-snow .ql-stroke, 
  .ql-snow .ql-fill,
  .ql-snow .ql-picker   {
    border-radius: 20px 20px 0 0;
    border-color: #8a8686;
    color: #8a8686;
    stroke: #8a8686;
  }

  .ql-container.ql-snow {
    border-radius: 0 0 20px 20px;
    border-color: #8a8686;
  }
`;

export default function GeradorTextos() {

  const { t } = useTranslation("common");

  const theme = "snow";

  const { quill, quillRef } = useQuill({ theme });

  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState('hidden');
  const [visibility2, setVisibility2] = useState('hidden');

  const [numPalavras, setNumPalavras] = useState();
  const [urlArtigo, setUrlArtigo] = useState();
  const [nomeEmpresa, setNomeEmpresa] = useState();
  const [siteEmpresa, setSiteEmpresa] = useState();

  const border = useColorModeValue('black', 'white');

  // const [text, setText] = useState();

  const route = useRouter();

  async function handleSubmit() {

    const locale = route.locale;

    setIsLoading(true);

    setVisibility('visible');

    getText(locale, numPalavras, urlArtigo, nomeEmpresa, siteEmpresa)
      .then((res) => {
        setIsLoading(false);
        setVisibility2('visible');

        const data = res;

        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          quill.setText(el);
        })

      })
      .catch((err) => {
        setIsLoading(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();
  }

  const fields = [
    {
      isRequired: true,
      id: 'urlArtigo',
      title: t('urlArtigo'),
      value: urlArtigo,
      onChange: (e) => setUrlArtigo(e.target.value)
    },
    {
      isRequired: true,
      id: 'nomeEmpresa',
      title: t('nomeEmpresa'),
      value: nomeEmpresa,
      onChange: (e) => setNomeEmpresa(e.target.value)
    },
    {
      isRequired: true,
      id: 'siteEmpresa',
      title: t('siteEmpresa'),
      value: siteEmpresa,
      onChange: (e) => setSiteEmpresa(e.target.value)
    }
  ]

  return (
    // <ProtectedRoute>>
      <SideBar
        nomePagina={t('geradorTexto')}>
        <Flex
          flexDir={'column'}
          gap='6'>
          <FormControl
            isRequired>
            <FormLabel>
              {t('numPalavras')}
            </FormLabel>
            <RadioGroup
              colorScheme={'purple'}
              onChange={setNumPalavras}>
              <Grid
                templateColumns={'repeat(4,1fr)'}
                gap='4'
                w='min-content'>
                <Radio
                  value='500'>
                  500
                </Radio>
                <Radio
                  value='1000'>
                  1000
                </Radio>
                <Radio
                  value='1500'>
                  1500
                </Radio>
                <Radio
                  value='2000'>
                  2000
                </Radio>
              </Grid>
            </RadioGroup>
          </FormControl>
          {fields.map((item, idx) => (
            <Field
              key={idx}
              isRequired={item.isRequired}
              id={item.id}
              title={item.title}
              value={item.value}
              onChange={item.onChange} />
          ))}
          <Box
            w='full'>
            <Button
              onClick={() => { handleSubmit() }}
              variant="button-orange"
              _hover={{
                bg: "#FFB596",
              }} >
              {t('gerar')}
            </Button>
          </Box>
          <Box
            visibility={visibility}>
            {isLoading
              ?
              <Flex
                gap='4'
                align={'center'}
                mb='4'>
                <CircularProgress
                  isIndeterminate />
                <Text>
                  {t('aguarde')}
                </Text>
              </Flex>
              :
              <></>
            }
            <Estilo>
              <Box
                visibility={visibility2}
                ref={quillRef}
                h={"96"} />
            </Estilo>
          </Box>
        </Flex>
      </SideBar>
    // </ProtectedRoute>
  )
}

const Field = ({
  isRequired,
  id,
  title,
  value,
  onChange
}) => {

  const border = useColorModeValue('black', 'white');

  return (
    <FormControl
      isRequired={isRequired}>
      <FormLabel
        htmlFor={id}>
        {title}
      </FormLabel>
      <Input
        borderRadius={'30px'}
        borderColor={border}
        id={id}
        value={value || ''}
        onChange={onChange} />
    </FormControl>
  )
}

import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { IoMdCode } from "react-icons/io";
import { getDescription, getTitle } from "../../services/getApis";
import CopyClipboard from "../../components/CopyClipboard";
import SideBar from '../../components/SideBar';
import ProtectedRoute from '../../components/ProtectedRoute';
import Keywords from '../../components/Keywords';
import { db } from "../../config/firebase";
import {
  collection,
  addDoc
} from "firebase/firestore";
import { getCookie } from 'cookies-next';

export default function GeradorTitle() {

  const { t } = useTranslation("common");

  const [isLoadingT, setIsLoadingT] = useState(false);
  const [isLoadingD, setIsLoadingD] = useState(false);
  const [visibility, setVisibility] = useState('hidden');

  const [type, setType] = useState();

  const [keywords, setKeywords] = useState([]);

  const [id, setId] = useState(1);
  const [name, setName] = useState('');
  const [h1, seth1] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const border = useColorModeValue("primary", "white");
  const border2 = useColorModeValue('black', 'white');

  const route = useRouter();

  const userId = getCookie('uid');

  async function handleSubmit() {

    setIsLoadingT(true);
    setIsLoadingD(true);

    setVisibility('visible');

    const locale = route.locale;

    getTitle(locale, keywords.toString(), type)
      .then(async (res) => {
        setIsLoadingT(false);

        const data = res;
        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          seth1(el);
          setTitle(el);

          // addDoc(collection(db, "titlesDescriptions"), {
          //   user: userId,
          //   title: el,
          //   h1: el
          // });

        });

      })
      .catch((err) => {
        setIsLoadingT(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();

    getDescription(locale, keywords.toString(), type)
      .then((res) => {
        setIsLoadingD(false);

        const data = res;
        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          setDescription(el);
        });

      })
      .catch((err) => {
        setIsLoadingD(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();

  }

  function firestore() {
    try {
      addDoc(collection(db, "titlesDescriptions"), {
        user: userId,
        title: title,
        h1: h1,
        description: description,
        createdAt: Date().toLocaleString()
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleKeypress = e => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  }

  const handleAddClick = () => {
    if (name != '') {
      setId(id => id + 1);
      if (keywords.length < 3) {
        setKeywords(list => [...list, name]);
      }
      setName('');
    }
  }

  const handleClear = () => {
    setId(0);
    setKeywords([]);
  }

  function copyHTMLH1() {
    var htmlCode = `<h1>${h1}</h1>`;

    navigator.clipboard.writeText(htmlCode);

    alert(htmlCode);
  }

  function copyHTMLTitle() {
    var htmlCode = `<title>${title}</title>`;

    navigator.clipboard.writeText(htmlCode);

    alert(htmlCode);
  }

  function copyHTMLDescription() {
    var htmlCode = `<meta name="description" content="${description}">`;

    navigator.clipboard.writeText(htmlCode);

    alert(htmlCode);
  }

  return (
    // <ProtectedRoute>>
    <SideBar
      nomePagina={t('geradorTitle')}>
      <Grid
        templateColumns={'repeat(3,1fr)'}
        gap='6'>
        <GridItem>
          <Flex
            flexDir={'column'}
            gap='4'>
            <FormControl
              isRequired>
              <FormLabel>
                {t('tipoConteudo')}
              </FormLabel>
              <Select
                id="select-tipo"
                name="tipo"
                onChange={(e) => setType(e.target.value)}
                borderColor={border2}
                borderRadius={"30px"} >
                <option value="">
                </option>
                <option value="Loja">
                  {t('loja')}
                </option>
                <option value="Blog">
                  Blog
                </option>
                <option value="Institucional">
                  Institucional
                </option>
                <option value="Outros">
                  {t('outros')}
                </option>
              </Select>
            </FormControl>
            <Keywords
              required={true}
              label={t('palavraChave')}
              tooltip={'palavraChave'}
              name={name}
              keyPress={handleKeypress}
              changeName={(e) => setName(e.target.value)}
              addClick={handleAddClick}
              clear={handleClear}>
              <Flex>
                {keywords.map((item) => {
                  const handleRemoveClick = () => {
                    setKeywords(list => list.filter((entry) => entry !== item));
                  };
                  return (
                    <Tag
                      key={item}
                      borderRadius='full'
                      w='min-content'
                      variant='solid'
                      colorScheme='purple'
                      mr='2'
                      mb='2'>
                      <TagLabel>
                        {item}
                      </TagLabel>
                      <TagCloseButton
                        onClick={handleRemoveClick} />
                    </Tag>
                  )
                })}
              </Flex>
            </Keywords>
            <Box
              w='full'>
              <Button
                onClick={() => { handleSubmit(); firestore(); }}
                variant="button-orange"
                _hover={{
                  bg: "#FFB596",
                }} >
                {t('gerarTitleDescription')}
              </Button>
            </Box>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={'2'}>
          <Flex
            visibility={visibility}
            className="Fields"
            flexDir={"column"}
            gap="4">
            {isLoadingT
              ?
              <CircularProgress
                isIndeterminate />
              :
              <>
                <Field
                  id={"h1-textarea"}
                  titulo={'H1'}
                  value={h1}
                  copyText={h1}
                  copyHTML={copyHTMLH1} />
                <Field
                  id={"title-textarea"}
                  titulo={"Title"}
                  value={title}
                  copyText={title}
                  copyHTML={copyHTMLTitle} />
              </>
            }
            {isLoadingD
              ?
              <CircularProgress
                isIndeterminate />
              :
              <>
                <Flex
                  justifyContent={"space-between"}
                  align="center">
                  <Text>
                    {t('descricao')}
                  </Text>
                  <ButtonGroup spacing="5">
                    <CopyClipboard
                      pos={'absolute'}
                      copyText={description} />
                    <Button
                      onClick={copyHTMLDescription}
                      variant={"button-outline"}
                      borderColor={border}
                      color={border}>
                      <Flex
                        gap="2"
                        align={"center"}>
                        <IoMdCode />
                        HTML
                      </Flex>
                    </Button>
                  </ButtonGroup>
                </Flex>
                <Textarea
                  id={"description-textarea"}
                  borderColor={border2}
                  rows='8'
                  readOnly
                  borderRadius={"30px"}
                  value={description || ''} />
              </>
            }
          </Flex>
        </GridItem>
      </Grid>
    </SideBar>
    // </ProtectedRoute>
  )
}

function Field({
  titulo,
  copyText,
  copyHTML,
  id,
  value,
  onChange
}) {

  const border = useColorModeValue("primary", "white");
  const bg = useColorModeValue('white', 'gray.900');
  const border2 = useColorModeValue('black', 'white');

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        align="center">
        <Text>
          {titulo}
        </Text>
        <ButtonGroup spacing="5">
          <CopyClipboard
            pos={'absolute'}
            copyText={copyText} />
          <Button
            onClick={copyHTML}
            variant={"button-outline"}
            borderColor={border}
            color={border}>
            <Flex
              gap="2"
              align={"center"}>
              <IoMdCode />
              HTML
            </Flex>
          </Button>
        </ButtonGroup>
      </Flex>
      <Input
        id={id}
        borderColor={border2}
        readOnly
        borderRadius={"30px"}
        value={value || ''}
        onChange={onChange} />
    </>
  )
}

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { getSocialMedia } from "../../services/getApis";
import CopyClipboard from "../../components/CopyClipboard";
import SideBar from '../../components/SideBar';
import ProtectedRoute from '../../components/ProtectedRoute';
import Descriptions from '../../components/Descriptions';

export default function GeradorSocialMedia() {

  const { t } = useTranslation("common");

  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState('hidden');

  const [topic, setTopic] = useState();

  const [keywords, setKeywords] = useState([]);
  const [id, setId] = useState(1);
  const [name, setName] = useState('');

  const [result, setResult] = useState([]);

  const [count, setCount] = useState(0);
  const [countTag, setCountTag] = useState('');
  const [visibilityTag, setVisibilityTag] = useState('hidden');
  const [colorful, setColorful] = useState('gray');

  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('primary', 'white');
  const border = useColorModeValue('black', 'white');

  const route = useRouter();

  async function onSubmit() {

    const locale = route.locale;

    setIsLoading(true);

    setVisibility('visible');

    var caracteres = 20;
    var midiaSocial = 'Internet';

    getSocialMedia(locale, caracteres, topic, keywords.toString(), midiaSocial)
      .then((res) => {
        setIsLoading(false);

        const data = res;
        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          const list = el.split('/');

          setResult(list);
        })

      })
      .catch((err) => {
        setIsLoading(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();
  }

  useEffect(() => {
    if (count >= 1) {
      setVisibilityTag('visible');
      if (count <= 50) {
        setColorful('red');
        setCountTag('Fraco');
      } else if (count >= 51 && count <= 100) {
        setColorful('yellow');
        setCountTag('Justo');
      } else {
        setColorful('green');
        setCountTag('Ótimo');
      }
    } else {
      setVisibilityTag('hidden');
    }
  }, [count]);

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      handleAddClick();
    }
  }

  const handleAddClick = (event) => {
    // event.preventDefault();
    if (name != '') {
      setId(id => id + 1);
      setKeywords(list => [...list, name]);
      setName('');
    }
  }

  const handleClear = () => {
    setId(0);
    setKeywords([]);
  }

  return (
    // <ProtectedRoute>>
    <SideBar
      nomePagina={t('geradorProduto')}>
      <Grid
        templateColumns={{
          lg: 'repeat(3,1fr)',
          sm: 'repeat(1,1fr)'
        }}
        gap='6'>
        <GridItem>
          <form>
            <Flex
              flexDir={'column'}
              gap={'4'}
              align='center'>
              <Descriptions
                label={t('topico')}
                tooltip={'topico'}
                value={topic}
                changeDescription={(e) => { setTopic(e.target.value);; setCount(e.target.value.length) }}
                count={count}
                colorful={colorful}
                countTag={countTag}
                visibilityTag={visibilityTag} />
              {/* <FormControl
                isRequired>
                <FormLabel
                  htmlFor={id}>
                  {t('topico')}
                </FormLabel>
                <Textarea
                  borderRadius={'30px'}
                  borderColor={border}
                  id={id}
                  rows='8'
                  value={topic || ''}
                  onChange={(e) => setTopic(e.target.value)} />
              </FormControl> */}
              <Flex
                w='full'
                flexDir={'column'}
                gap='4'>
                <Flex
                  align={'center'}
                  gap='2'>
                  <Field
                    title={t('palavraChave')}
                    isRequired={true}
                    value={name}
                    onKeyPress={handleKeypress}
                    onChange={(e) => setName(e.target.value)} />
                  <Button
                    onClick={handleAddClick}
                    variant='button'
                    mt='8'>
                    {t('adicionar')}
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant='button-outline'
                    color={color}
                    borderColor={color}
                    mt='8'>
                    {t('limpar')}
                  </Button>
                </Flex>
                <div>
                  {keywords.map((item) => {
                    const handleRemoveClick = () => {
                      setKeywords(list => list.filter((entry) => entry !== item));
                    };
                    return (
                      <Tag
                        key={item}
                        borderRadius='full'
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
                    );
                  })}
                </div>
              </Flex>
              <Button
                value='Generate'
                w='100%'
                mt='4'
                variant='button-orange'
                onClick={() => { onSubmit() }}>
                {t('gerar')}
              </Button>
            </Flex>
          </form>
        </GridItem>
        <GridItem
          colSpan={'2'}
          visibility={visibility}>
          <Flex
            flexDir={'column'}
            bg={bg}
            borderRadius={'30px'}
            p='4'
            gap={'4'}
            alignItems={'initial'}>
            {isLoading
              ?
              <CircularProgress
                isIndeterminate />
              :
              <Flex
                flexDir={'column'}
                gap='4'>
                {result?.map((item) => (
                  <Flex
                    key={item}
                    align='center'
                    gap='2'>
                    <Textarea
                      borderRadius={'30px'}
                      borderColor={border}
                      bg={bg}
                      key={item}
                      defaultValue={item}
                      readOnly />
                    <CopyClipboard
                      copyText={item} />
                  </Flex>
                ))}
              </Flex>
            }
          </Flex>
        </GridItem>
      </Grid>
    </SideBar>
    // </ProtectedRoute>
  )
}

const Field = ({
  isRequired,
  id,
  title,
  value,
  onChange,
  handleKeyDown,
  onKeyPress
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
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onKeyPress={onKeyPress} />
    </FormControl>
  )
}
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
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { getDescriptionsProduct, getTitlesProduct } from "../../services/getApis";
import CopyClipboard from "../../components/CopyClipboard";
import Menu from '../../components/Menu';
import ProtectedRoute from '../../components/ProtectedRoute';
import DownloadTxt from "../../components/DownloadTxt";

export default function GeradorProduto() {

  const { t } = useTranslation("common");

  const [isLoadingT, setIsLoadingT] = useState(false);
  const [isLoadingD, setIsLoadingD] = useState(false);
  const [visibility, setVisibility] = useState('hidden');
  const [display, setDisplay] = useState('inline-flex');
  const [display2, setDisplay2] = useState('none');

  const [company, setCompany] = useState();
  const [product, setProduct] = useState();
  const [tom, setTom] = useState();

  const [keywords, setKeywords] = useState([]);
  const [id, setId] = useState(1);
  const [name, setName] = useState('');

  const [productDescription, setProductDescription] = useState([]);
  const [id2, setId2] = useState(1);
  const [name2, setName2] = useState('');

  const [title1, setTitle1] = useState();
  const [title2, setTitle2] = useState();
  const [title3, setTitle3] = useState();

  const [description1, setDescription1] = useState();
  const [description2, setDescription2] = useState();
  const [description3, setDescription3] = useState();

  const [readOnly1, setReadOnly1] = useState(true);
  const [border1, setBorder1] = useState('none');
  const [readOnly2, setReadOnly2] = useState(true);
  const [border2, setBorder2] = useState('none');
  const [readOnly3, setReadOnly3] = useState(true);
  const [border3, setBorder3] = useState('none');

  const bg = useColorModeValue('white', 'gray.900');
  const bg2 = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('primary', 'white');

  const route = useRouter();

  async function onSubmit() {

    const locale = route.locale;

    setIsLoadingT(true);
    setIsLoadingD(true);

    setVisibility('visible');

    getTitlesProduct(locale, company, product, keywords.toString(), productDescription.toString(), tom)
      .then((res) => {
        setIsLoadingT(false);

        const data = res;
        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          const titles = el?.split('/');

          setTitle1(titles[0]);
          setTitle2(titles[1]);
          setTitle3(titles[2]);
        })

      })
      .catch((err) => {
        setIsLoadingT(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();

    getDescriptionsProduct(locale, company, product, keywords.toString(), productDescription.toString(), tom)
      .then((res) => {
        setIsLoadingD(false);

        const data = res;
        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          const descriptions = el?.split('/');

          setDescription1(descriptions[0]);
          setDescription2(descriptions[1]);
          setDescription3(descriptions[2]);
        })

      })
      .catch((err) => {
        setIsLoadingD(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();
  }

  const arrayTitles = [`${title1}`, `${title2}`, `${title3}`];
  const arrayDescriptions = [`${description1}`, `${description2}`, `${description3}`];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = () => {
      setIndex(prevIndex => {
        if (prevIndex === arrayTitles.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      })
    };
    setInterval(timer, 10000);

    return () => { clearInterval(timer); }
  }, []);

  useEffect(() => {
    const timer = () => {
      setIndex(prevIndex => {
        if (prevIndex === arrayDescriptions.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      })
    };
    setInterval(timer, 10000);

    return () => { clearInterval(timer); }
  }, []);

  const handleKeypress = e => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  }

  const handleKeypress2 = e => {
    if (e.key === 'Enter') {
      handleAddClick2();
    }
  }

  const handleAddClick = (event) => {
    if (name != '') {
      setId(id => id + 1);
      setKeywords(list => [...list, name]);
      setName('');
    }
  }

  const handleAddClick2 = (event) => {
    if (name2 != '') {
      setId2(id => id + 1);
      setProductDescription(list => [...list, name2]);
      setName2('');
    }
  }

  const handleClear = () => {
    setId(0);
    setKeywords([]);
  }

  const handleClear2 = () => {
    setId2(0);
    setProductDescription([]);
  }

  const handleSave = () => {
    setDisplay('inline-flex');
    setDisplay2('none');
  }


  const fields = [
    {
      isRequired: true,
      id: 'company',
      title: t('nomeEmpresa'),
      value: company,
      onChange: (e) => setCompany(e.target.value)
    },
    {
      isRequired: true,
      id: 'product',
      title: t('nomeProduto'),
      value: product,
      onChange: (e) => setProduct(e.target.value)
    }
  ]

  const content = [
    {
      title: title1,
      onChangeTitle: (e) => setTitle1(e.target.value),
      description: description1,
      onChangeDescription: (e) => setDescription1(e.target.value),
      readOnly: readOnly1,
      border: border1,
      slice1: 0,
      slice2: 1,
      onClickEdit: (e) => { setBorder1('1px'); setReadOnly1(false) }
    },
    {
      title: title2,
      onChangeTitle: (e) => setTitle2(e.target.value),
      description: description2,
      onChangeDescription: (e) => setDescription2(e.target.value),
      readOnly: readOnly2,
      border: border2,
      slice1: 1,
      slice2: 2,
      onClickEdit: (e) => { setBorder2('1px'); setReadOnly2(false) }
    },
    {
      title: title3,
      onChangeTitle: (e) => setTitle3(e.target.value),
      description: description3,
      onChangeDescription: (e) => setDescription3(e.target.value),
      readOnly: readOnly3,
      border: border3,
      slice1: 2,
      slice2: 3,
      onClickEdit: (e) => { setBorder3('1px'); setReadOnly3(false) }
    }
  ]

  const editFields = [
    {
      id: 'title1',
      title: `${t('titulo')} 1`,
      value: title1 || '',
      onChange: (e) => setTitle1(e.target.value),
      colSpan: 1
    },
    {
      id: 'title2',
      title: `${t('titulo')} 2`,
      value: title2 || '',
      onChange: (e) => setTitle2(e.target.value),
      colSpan: 1
    },
    {
      id: 'title3',
      title: `${t('titulo')} 3`,
      value: title3 || '',
      onChange: (e) => setTitle3(e.target.value),
      colSpan: 1
    },
    {
      id: 'description1',
      title: `${t('descricao')} 1`,
      value: description1 || '',
      onChange: (e) => setDescription1(e.target.value),
      colSpan: 2
    },
    {
      id: 'description2',
      title: `${t('descricao')} 2`,
      value: description2 || '',
      onChange: (e) => setDescription2(e.target.value),
      colSpan: 2
    },
    {
      id: 'description3',
      title: `${t('descricao')} 3`,
      value: description3 || '',
      onChange: (e) => setDescription3(e.target.value),
      colSpan: 2
    }
  ]

  const itemsHeadlines = [
    {
      color: title1?.replace(/\s/g, '').length > 120 ? 'red' : 'green',
      title: `${t('titulo')} 1:`,
      total: title1?.replace(/\s/g, '').length,
      cont: 120
    },
    {
      color: title2?.replace(/\s/g, '').length > 120 ? 'red' : 'green',
      title: `${t('titulo')} 2:`,
      total: title2?.replace(/\s/g, '').length,
      cont: 120
    },
    {
      color: title3?.replace(/\s/g, '').length > 120 ? 'red' : 'green',
      title: `${t('titulo')} 3:`,
      total: title3?.replace(/\s/g, '').length,
      cont: 120
    }
  ]

  const itemsDescriptions = [
    {
      color: description1?.replace(/\s/g, '').length > 300 ? 'red' : 'green',
      title: `${t('descricao')} 1:`,
      total: description1?.replace(/\s/g, '').length,
      cont: 300
    },
    {
      color: description2?.replace(/\s/g, '').length > 300 ? 'red' : 'green',
      title: `${t('descricao')} 2:`,
      total: description2?.replace(/\s/g, '').length,
      cont: 300
    },
    {
      color: description3?.replace(/\s/g, '').length > 300 ? 'red' : 'green',
      title: `${t('descricao')} 3:`,
      total: description3?.replace(/\s/g, '').length,
      cont: 300
    }
  ]

  const download = [
    {
      title1: title1,
      description1: description1
    },
    {
      title1: title2,
      description1: description2
    },
    {
      title1: title3,
      description1: description3
    },
  ]

  return (
    <ProtectedRoute>
      <Menu>
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
                gap={'4'}>
                {fields.map((item, idx) => (
                  <Field
                    key={idx}
                    isRequired={item.isRequired}
                    id={item.id}
                    title={item.title}
                    value={item.value}
                    onChange={item.onChange} />
                ))}
                <Flex
                  w='full'
                  flexDir={'column'}
                  gap='4'>
                  <FormControl
                    isRequired>
                    <FormLabel>
                      {t('adicionarPalavraChave')}
                    </FormLabel>
                    <Flex
                      align={'center'}
                      gap='2'>
                      <Input
                        isRequired={true}
                        bg={bg}
                        value={name}
                        borderRadius={"30px"}
                        onKeyPress={handleKeypress}
                        onChange={(e) => setName(e.target.value)} />
                      <Button
                        onClick={handleAddClick}
                        variant='button'>
                        Add item
                      </Button>
                      <Button
                        onClick={handleClear}
                        variant='button-outline'
                        color={color}
                        borderColor={color}>
                        Clear list
                      </Button>
                    </Flex>
                  </FormControl>
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
                      )
                    })}
                  </div>
                </Flex>
                <Flex
                  w='full'
                  flexDir={'column'}
                  gap='4'>
                  <FormControl
                    isRequired>
                    <FormLabel>
                      {t('caracteristicasProduto')}
                    </FormLabel>
                    <Flex
                      align={'center'}
                      gap='2'>
                      <Input
                        isRequired={true}
                        bg={bg}
                        value={name2}
                        borderRadius={"30px"}
                        onKeyPress={handleKeypress2}
                        onChange={(e) => setName2(e.target.value)} />
                      <Button
                        onClick={handleAddClick2}
                        variant='button'>
                        Add item
                      </Button>
                      <Button
                        onClick={handleClear2}
                        variant='button-outline'
                        color={color}
                        borderColor={color}>
                        Clear list
                      </Button>
                    </Flex>
                  </FormControl>
                  <div>
                    {productDescription.map((item) => {
                      const handleRemoveClick = () => {
                        setProductDescription(list => list.filter((entry) => entry !== item));
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
                      )
                    })}
                  </div>
                </Flex>
                <FormControl
                  isRequired>
                  <FormLabel>
                    Tom
                  </FormLabel>
                  <Select
                    borderRadius={'30px'}
                    bg={bg}
                    onChange={(e) => setTom(e.target.value)}>
                    <option value="">
                    </option>
                    <option
                      value="positivo">
                      Positivo
                    </option>
                    <option
                      value="negativo">
                      Negativo
                    </option>
                    <option
                      value="neutro">
                      Neutro
                    </option>
                  </Select>
                </FormControl>
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
            {isLoadingT
              ?
              <CircularProgress
                isIndeterminate />
              :
              <Flex
                flexDir={'column'}
                gap='4'>
                <DownloadTxt content={download} />
                {content.map((item, idx) => (
                  <Content
                    key={idx}
                    display={display}
                    title={item.title}
                    onChangeTitle={item.onChangeTitle}
                    isLoadingD={isLoadingD}
                    description={item.description}
                    onChangeDescription={item.onChangeDescription}
                    readOnly={item.readOnly}
                    border={item.border}
                    itemsHeadlines={itemsHeadlines}
                    itemsDescriptions={itemsDescriptions}
                    slice1={item.slice1}
                    slice2={item.slice2}
                    onClickEdit={item.onClickEdit} />
                ))}

              </Flex>
            }
            <Box
              display={display2}
              w='100%'>
              <Grid
                templateColumns={{
                  lg: 'repeat(2,1fr)'
                }}
                flexDir={'column'}
                gap='4'>
                {editFields.map((item, idx) => (
                  <EditableField
                    key={idx}
                    id={item.id}
                    title={item.title}
                    value={item.value}
                    onChange={item.onChange}
                    colSpan={item.colSpan} />
                ))}
                <GridItem
                  colSpan={2}>
                  <Button
                    onClick={handleSave}
                    float='right'
                    variant='button-orange'
                    w='40'>
                    {t('salvar')}
                  </Button>
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
        </Grid>
      </Menu>
    </ProtectedRoute>
  )
}
const Content = ({
  display,
  title,
  onChangeTitle,
  isLoadingD,
  description,
  onChangeDescription,
  readOnly,
  border,
  itemsHeadlines,
  itemsDescriptions,
  slice1,
  slice2,
  onClickEdit
}) => {
  const bg = useColorModeValue('gray.100', 'gray.900');

  return (
    <Flex
      flexDir={'column'}
      bg={bg}
      display={display}
      borderRadius={'30px'}
      p='4'
      gap={'4'}
      alignItems={'initial'}>
      <Input
        value={title}
        onChange={onChangeTitle}
        readOnly={readOnly}
        fontWeight={'bold'}
        fontSize='2xl'
        px='0'
        border={border}
        borderColor='gray.400' />
      {isLoadingD
        ?
        <CircularProgress
          isIndeterminate />
        :
        <Textarea
          value={description}
          onChange={onChangeDescription}
          readOnly={readOnly}
          rows='3'
          px='0'
          border={border}
          borderColor='gray.400' />
      }
      <Flex
        display={display}>
        {itemsHeadlines?.slice(slice1, slice2).map((item, idx) => (
          <Item
            key={idx}
            color={item.color}
            title={item.title}
            total={item.total}
            cont={item.cont} />
        ))}
      </Flex>
      <Flex
        mt='-10px'
        display={display}
        justifyContent='space-between'
        align={'center'}>
        {itemsDescriptions?.slice(slice1, slice2).map((item, idx) => (
          <Item
            key={idx}
            color={item.color}
            title={item.title}
            total={item.total}
            cont={item.cont} />
        ))}
        <Button
          bg={bg}
          variant='button-outline'
          onClick={onClickEdit}>
          Editar
        </Button>
      </Flex>
    </Flex>
  )
}

const EditableField = ({
  colSpan,
  isRequired,
  id,
  title,
  value,
  onChange
}) => {
  const bg = useColorModeValue('white', 'gray.900');

  return (
    <GridItem
      colSpan={{
        lg: colSpan,
        sm: 2
      }}>
      <FormControl
        isRequired={isRequired}>
        <Flex
          justifyContent={'space-between'}
          align='center'>
          <FormLabel
            htmlFor={id}>
            {title}
          </FormLabel>
          <CopyClipboard
            copyText={value} />
        </Flex>
        <Input
          borderRadius={'30px'}
          bg={bg}
          id={id}
          mt='2'
          value={value || ''}
          onChange={onChange} />
      </FormControl>
    </GridItem>
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
  const bg = useColorModeValue('white', 'gray.900');

  return (
    <FormControl
      isRequired={isRequired}>
      <FormLabel
        htmlFor={id}>
        {title}
      </FormLabel>
      <Input
        borderRadius={'30px'}
        bg={bg}
        id={id}
        value={value || ''}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onKeyPress={onKeyPress} />
    </FormControl>
  )
}

const Item = ({
  color,
  title,
  total,
  cont }) => {
  return (
    <Tag
      colorScheme={color}
      fontSize='16px'
      mr='2'
      mb='2'>
      <TagLabel>
        {title}{' '}{total}/{cont}{' '}char
      </TagLabel>
    </Tag>
  )
}


//export const base_url = `https://back.alhadith.dialtechnologies.net`
export const base_url = `https://backend.7adith.ma:8000`
//export const base_url = `https://backend.hadithm6.ma`
const { BASE_URL_CMS } = process.env
export const api_url = `${base_url}/en/jsonapi/node`
//export const api_url = `https://backend.7adith.ma:8000/en/jsonapi/node`

//export const api_search = `https://apisearch.hadithm6.ma`
//export const api_newsletter = `https://apisearch.hadithm6.ma/api/addmembre`

export const api_search = `https://apisearch.7adith.ma:8000`
export const api_newsletter = `https://apisearch.7adith.ma:8000/api/addmembre`

// export const base_url = `https://api.pray.zone/`

export const getResourcesData = (langcode, value = 'موارد') =>
  `${api_url}/section?fields[node--section]=title,body,field_icone,field_lien&filter[langcode]=${langcode}&filter[alqsm][condition][path]=field_alqsm.name&filter[alqsm][condition][value]=${value}&include=field_icone`
export const getCommanderieCroyantsData = (
  langcode,
  value = 'عناية أمير المومنين'
) =>
  `${api_url}/section?fields[node--section]=title,body,field_icone,field_lien,field_code_couleur&filter[langcode]=${langcode}&filter[alqsm][condition][path]=field_alqsm.name&filter[alqsm][condition][value]=${value}&include=field_icone`
export const getMawdouaData = (langcode, value = 'الاحاديت الموضوعة') =>
  `${api_url}/mawdoua?fields[node--mawdoua]=title,body,field_icone,field_lien&filter[langcode]=${langcode}&filter[alkism][condition][path]=field_alkism.name&filter[alkism][condition][value]=${value}`
export const getSlideHome = (langcode) =>
  `${api_url}/slider?fields[node--slider]=field_liens,field_texte&filter[langcode]=${langcode}&include=field_images`
export const AllVideo = () =>
  `${api_url}/video?include=field_thumbnail_video,field_upload_video&fields[node--video]=title,field_description_video,field_lien_video,field_thumbnail_video,field_categorie_video,field_upload_video`
export const getArticlesByTag = (value) =>
  `${base_url}/meta-tags?field_tags_target_id=${value}`
export const getVideoMedia = (title) =>
  `${base_url}/videos?field_categorie_video_name=${title}`
export const getVideoByParent = (id) =>
  `${base_url}/videos-by-parent-id?parent_id=${id}&tid=${id}`
export const getVideo = (title) =>
  `${api_url}/video?include=field_thumbnail_video,field_upload_video&fields[node--video]=title,field_description_video,field_lien_video,field_thumbnail_video,field_categorie_video,field_upload_video&&filter[field_categorie_video][condition][path]=field_categorie_video.name&filter[field_categorie_video][condition][value]=${title}`
// export const getArticleById = (title) => `${api_url}/article?include=field_image&fields[node--article]=title,body,created,field_image&filter[title]=${title}`
// export const getArticleById = title =>
//   `${api_url}/article?fields[node--article]=title,body&filter[alqsm][condition][path]=field_alqsm.name&filter[alqsm][condition][value]=${title}&include=field_tags.vid`;
export const getArticleById = (title) =>
  `${api_url}/article?fields[node--article]=title,body,created,field_image&filter[alqsm][condition][path]=title&filter[alqsm][condition][value]=${title}&include=field_tags.vid,field_image`
export const getArticleByIdName = (title) =>
  `${api_url}/article?fields[node--article]=title,body,created,field_image&filter[alqsm][condition][path]=title&filter[alqsm][condition][value]=${title}&include=field_tags.vid,field_image,field_alqsm.vid`

export const getOurPartners = (langcode, value = 'شركاؤنا') =>
  `${api_url}/section?include=field_icone&fields[node--section]=title,body,field_icone,field_lien&filter[langcode]=${langcode}&filter[alqsm][condition][path]=field_alqsm.name&filter[alqsm][condition][value]=${value}`
export const getSideArticle = (name, tid, parent_target) =>
  `${base_url}/en/article/preview?name_1=${name}&tid=${tid}&parent_target_id=${parent_target}`
export const getMenu = () => `${base_url}/en/menus`
export const getMenuByName = (name) =>
  `${base_url}/en/menus?name=${name}&parent_target_id=""`
export const getMenuLinks = (show = 1) => `${base_url}/en/menus?show=${show}`
export const getArticleByIdd = (title) =>
  `${api_url}/article?include=field_image&fields[node--article]=title,body,field_image,field_titre&filter[field_titre]=${title}`
export const getDegree = () => `${api_search}/api/degree`
export const getSource = () => `${api_search}/api/source`
export const getNarrator = () => `${api_search}/api/narrator`
export const getTopic = () => `${api_search}/api/topic`
export const getCategory = () => `${api_search}/api/categorie`
export const Search = () => `${api_search}/api/search`
// export const AllQuestions=()=>`${api_url}/question?fields[node--question]=title,field_description,created,drupal_internal__nid`
export const getQuestionbyID = (nID) =>
  `${base_url}/en/commentaire?entity_id=${nID}`
export const SubmitQuestionAPI = () => `${api_url}/question`
export const getQuestionAPI = () => `${api_url}/forum`
export const AllForums = () =>
  `${api_url}/forum?fields[node--forum]=title,created,body,comment_forum,taxonomy_forums,drupal_internal__nid`
export const getTaxonomyForum = () => `${base_url}/en/taxonomy/forums`
export const getSideItems = (id) =>
  `${base_url}/en/menu_by_parent?parent_target_id=${id}`
export const newsletter = () => `${api_newsletter}`
export const getLive = () => `${base_url}/live`
export const getCarousel = () =>
  `${api_url}/article?fields[node--article]=title,body&include=field_image&filter[field_est_slider]=1`
export const getSlider = () => `${base_url}/en/slider`
export const getNewSections = () => `${base_url}/section-accueil`
export const getDataNewSections = (NewSection) =>
  `${api_url}/section_accueil?include=field_icone_accueil&fields[node--section_accueil]=title,body,field_lien_accueil,field_code_couleur_accueil&filter[alqsm][condition][path]=field_alqsm_accueil.name&filter[alqsm][condition][value]=${NewSection}`
export const addQuestions = () => `${api_search}/api/addQuestion`
export const searchQuestion = () => `${api_search}/api/question/search`
export const getVideo1 = () =>
  `${api_url}/video?include=field_thumbnail_video,field_upload_video&fields[node--video]=title,field_description_video,field_lien_video,field_thumbnail_video,field_categorie_video,field_upload_video&&filter[field_categorie_video][condition][path]=field_categorie_video.name&filter[field_categorie_video][condition][value]=برامج على الشبكات الاجتماعية`
export const getVideoBt = () =>
  `${api_url}/video?include=field_thumbnail_video,field_upload_video&fields[node--video]=title,field_description_video,field_lien_video,field_thumbnail_video,field_categorie_video,field_upload_video&&filter[field_categorie_video][condition][path]=field_categorie_video.name&filter[field_categorie_video][condition][value]=برامج تلفزية`
export const getVideoBi = () =>
  `${api_url}/video?include=field_thumbnail_video,field_upload_video&fields[node--video]=title,field_description_video,field_lien_video,field_thumbnail_video,field_categorie_video,field_upload_video&&filter[field_categorie_video][condition][path]=field_categorie_video.name&filter[field_categorie_video][condition][value]=برامج اذاعية`
export const getVideoDh = () =>
  `${api_url}/video?include=field_thumbnail_video,field_upload_video&fields[node--video]=title,field_description_video,field_lien_video,field_thumbnail_video,field_categorie_video,field_upload_video&&filter[field_categorie_video][condition][path]=field_categorie_video.name&filter[field_categorie_video][condition][value]=الدروس الحديثية`
export const getVideoKi = () =>
  `${api_url}/video?include=field_thumbnail_video,field_upload_video&fields[node--video]=title,field_description_video,field_lien_video,field_thumbnail_video,field_categorie_video,field_upload_video&&filter[field_categorie_video][condition][path]=field_categorie_video.name&filter[field_categorie_video][condition][value]=الدروس الحسنية`
export const getVideoDorouss = (title) =>
  `${api_url}/video?include=field_thumbnail_video,field_upload_video&fields[node--video]=title,field_description_video,field_lien_video,field_thumbnail_video,field_categorie_video,field_upload_video&&filter[field_categorie_video][condition][path]=field_categorie_video.name&filter[field_categorie_video][condition][value]=${title}`

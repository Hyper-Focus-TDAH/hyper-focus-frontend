import { Card, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TextEditor from '../../../components/text-editor/TextEditor';
import { useT } from '../../../i18n/translate';
import ForumSearch from '../ForumSearch';
import ForumPostActions from '../posts/ForumPostActions';
import ForumPostVote from '../posts/ForumPostVote';
import styles from './PostPage.module.css';
import PostComments from './comments/PostComments';

const post = {
  forum: 'f/nomeDoForum',
  user: 'u/nomeDoUser',
  date: '1999-09-07',
  title: 'Titulo teste do post',
  description: 'Descricao teste do post post post post post post post ',
  tags: ['tag1', 'tag2', 'tag3'],
  upvotes: 30,
  downvotes: 5,
  isSaved: false,
};

const comments = [
  {
    username: 'nomeOutroUser',
    message:
      '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
    datePosted: '1999-09-07',
    dateEdited: '1999-09-07',
    upvotes: 20,
    downvotes: 2,
    comments: [
      {
        username: 'nomeOutroUser',
        message:
          '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
        datePosted: '1999-09-07',
        dateEdited: '1999-09-07',
        upvotes: 20,
        downvotes: 2,
        comments: [],
      },
      {
        username: 'nomeOutroUser',
        message:
          '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
        datePosted: '1999-09-07',
        dateEdited: '1999-09-07',
        upvotes: 20,
        downvotes: 2,
        comments: [],
      },
      {
        username: 'nomeOutroUser',
        message:
          '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
        datePosted: '1999-09-07',
        dateEdited: '1999-09-07',
        upvotes: 20,
        downvotes: 2,
        comments: [
          {
            username: 'nomeOutroUser',
            message:
              '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
            datePosted: '1999-09-07',
            dateEdited: '1999-09-07',
            upvotes: 20,
            downvotes: 2,
            comments: [],
          },
          {
            username: 'nomeOutroUser',
            message:
              '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
            datePosted: '1999-09-07',
            dateEdited: '1999-09-07',
            upvotes: 20,
            downvotes: 2,
            comments: [],
          },
          {
            username: 'nomeOutroUser',
            message:
              '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
            datePosted: '1999-09-07',
            dateEdited: '1999-09-07',
            upvotes: 20,
            downvotes: 2,
            comments: [],
          },
          {
            username: 'nomeOutroUser',
            message:
              '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
            datePosted: '1999-09-07',
            dateEdited: '1999-09-07',
            upvotes: 20,
            downvotes: 2,
            comments: [],
          },
          {
            username: 'nomeOutroUser',
            message:
              '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
            datePosted: '1999-09-07',
            dateEdited: '1999-09-07',
            upvotes: 20,
            downvotes: 2,
            comments: [],
          },
          {
            username: 'nomeOutroUser',
            message:
              '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
            datePosted: '1999-09-07',
            dateEdited: '1999-09-07',
            upvotes: 20,
            downvotes: 2,
            comments: [],
          },
          {
            username: 'nomeOutroUser',
            message:
              '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
            datePosted: '1999-09-07',
            dateEdited: '1999-09-07',
            upvotes: 20,
            downvotes: 2,
            comments: [],
          },
        ],
      },
      {
        username: 'nomeOutroUser',
        message:
          '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
        datePosted: '1999-09-07',
        dateEdited: '1999-09-07',
        upvotes: 20,
        downvotes: 2,
        comments: [],
      },
    ],
  },
];

function PostPage() {
  const t = useT();
  const userData = useSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <ForumSearch />
      <div className={styles['page-content']}>
        <Container className="container-margin-bottom">
          <Card className={styles.post}>
            <ForumPostVote upvotes={post.upvotes} downvotes={post.downvotes} />
            <div className={styles.content}>
              <div className={styles.section}>
                {post.forum} • {t('POSTED_BY')} {post.user}
              </div>
              <div className={styles.body}>
                <span className="h4 mb-0">{post.title}</span>
                <span className="h6">{post.description}</span>
              </div>
              <div className={styles.section}>
                <ForumPostActions />
              </div>
            </div>
          </Card>
          <Card className={styles.comments}>
            {t('COMMENT_AS', { username: userData.username })}
            <TextEditor />
            <PostComments comments={comments} />
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default PostPage;

export async function loader() {
  return [];
}

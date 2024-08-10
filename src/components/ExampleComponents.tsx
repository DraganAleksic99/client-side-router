import { Route } from './router/Route'
import { Link } from './router/Link'

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Topic = ({ topicId }: { topicId: string }) => <h2>Requested Topic ID: {topicId}</h2>

const Topics = ({ match }: { match: any }) => {
  const items = [
    { name: 'Rendering with React', slug: 'rendering' },
    { name: 'Components', slug: 'components' },
    { name: 'Props v. State', slug: 'props-v-state' },
  ]

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {items.map(({ name, slug }) => (
          <li key={slug}>
            <Link to={`${match.url}/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
      { items.map(({ name, slug }) => (
        <Route
          key={slug}
          path={`${match.url}/${slug}`}
          render={() => <Topic topicId={name} />}
        />
      ))}
      <Route
        exact
        path={match.url}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  )
}

export { Home, About, Topic, Topics }
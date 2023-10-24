import React from 'react';
import theme from '../../public/theme/theme.config';

const Colours = {
  grey: 'grey',
  green: 'green',
  turquoise: 'turquoise',
  blue: 'blue',
  purple: 'purple',
  pink: 'pink',
  red: 'red',
  orange: 'orange',
  yellow: 'yellow',
};
type TagProps = {
  colour?: keyof typeof Colours
  text: string
}
type TagGroupProps = {
  tags?: string
  frontmatter: {
    tags?: string[]
  }

}
export function Tag({ text = '', colour = 'blue' }: TagProps) {
  return <strong className={`govuk-tag govuk-tag--${colour}`}>{text}</strong>;
}

export function TagGroup({ frontmatter, tags }: TagGroupProps) {
  const getColour = (t: string) => {
    const o: { [key: string]: string[] } = theme.tagsColours;
    let colour = 'grey';
    Object.keys(o).forEach((k) => {
      if (o[k].includes(t)) {
        colour = k;
      }
    });

    return colour as keyof typeof Colours;
  };

  const tagArray: string[] = tags?.toString().split(',') || frontmatter?.tags || [];

  return tagArray.length > 0 ? (
    <ul className="govuk-list">
      {tagArray.map((tag, i) => {
        const arr: string[] = tag.split(':');
        const colour = arr[1] ? Colours[arr[1] as keyof typeof Colours] : getColour(tag);
        const text = arr[1] ? (frontmatter[arr[0] as keyof typeof frontmatter] || tag) : tag;

        return (
          <li key={`tag-list-${i + 1}`}>
            <Tag colour={Colours[colour]} text={text as string} />
          </li>
        );
      })}
    </ul>
  ) : (
    <p className="govuk-body-s">No tags</p>
  );
}

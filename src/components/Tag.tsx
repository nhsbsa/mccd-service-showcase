import React, { ReactNode } from 'react';
import { trim, toLower } from 'lodash';
import theme from '../../public/theme/theme.config';

const validColours = ['blue', 'green', 'grey', 'orange', 'pink', 'purple', 'red', 'turquoise', 'yellow'];

type Colours = typeof validColours[number];

type TagProps = {
  colour?: Colours;
  text: string;
};

type FrontmatterType = {
  [key: string]: string | string[] | undefined;
};

type TagGroupProps = {
  tags?: string;
  frontmatter?: {
    tags?: string[];
  } & FrontmatterType;
  children?: ReactNode | ReactNode[];
};

export const Tag = ({ text = '', colour = '' }: TagProps) => {
  const normalisedColour = toLower(trim(colour));
  const isValidColour = validColours.includes(normalisedColour) ? normalisedColour : 'grey';

  return <strong className={`govuk-tag govuk-tag--${isValidColour}`}>{text}</strong>;
};

export const TagList = ({ frontmatter, tags, children }: TagGroupProps) => {
  const getColour = (t: string) => {
    const { tagsColours } = theme;
    let colour: Colours = 'grey';

    Object.entries(tagsColours).some(([k, v]) => {
      if (v.includes(t)) {
        colour = k as Colours;
        return true;
      }
      return false;
    });

    return colour;
  };

  const tagArray: string[] = tags?.toString().split(',') || frontmatter?.tags || [];

  return (
    <ul className="govuk-list">
      {tagArray.map((tag, i) => {
        const [tagName, colour] = tag.split(':');
        const normalisedColour = toLower(trim(colour || ''));
        const validColour = validColours.includes(normalisedColour)
          ? normalisedColour
          : getColour(tagName);

        return (
          <li key={`tag-list-${i + 1}`}>
            <Tag colour={validColour} text={tagName as string} />
          </li>
        );
      })}
      {React.Children.map(children, (child, index) => (
        <li key={`child-${index + 1}`}>{child}</li>
      ))}
      {tagArray.length === 0 && !children && <li>No tags</li>}
    </ul>
  );
};

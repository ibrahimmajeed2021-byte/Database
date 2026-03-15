import "./scss/Icons.scss";

const Icon = ({ children }) => <div className="Icon">{children}</div>;

const Collapse = () => (
  <Icon className="IconCollapse">
    <img
      src="https://img.icons8.com/material-sharp/24/000000/collapse-arrow.png"
      alt="Collapse icon"
    />
  </Icon>
);

const Cross = () => (
  <Icon className="IconCross">
    <img
      src="https://img.icons8.com/material-outlined/24/undefined/delete-sign.png"
      alt="Cross icon"
    />
  </Icon>
);

const Database = () => (
  <Icon className="IconDatabase">
    <img
      src="https://img.icons8.com/ios-filled/50/000000/database.png"
      alt="Database icon"
    />
  </Icon>
);

const Expand = () => (
  <Icon className="IconExpand">
    <img
      src="https://img.icons8.com/material-sharp/24/000000/expand-arrow.png"
      alt="Expand icon"
    />
  </Icon>
);

const Group = () => (
  <Icon className="Icon IconGroup">
    <img
      src="https://img.icons8.com/ios-filled/50/undefined/conference-call.png"
      alt="Group icon"
    />
  </Icon>
);

const List = () => (
  <Icon className="IconList">
    <img
      src="https://img.icons8.com/material-sharp/24/undefined/list.png"
      alt="List icon"
    />
  </Icon>
);

const Pen = () => (
  <Icon className="IconPen">
    <img
      src="https://img.icons8.com/ios-glyphs/30/undefined/edit--v1.png"
      alt="Pen icon"
    />
  </Icon>
);

const Plus = () => (
  <Icon className="IconPlus">
    <img
      src="https://img.icons8.com/external-basicons-line-edtgraphics/50/undefined/external-add-ui-basic-basicons-line-edtgraphics-2.png"
      alt="Pen icon"
    />
  </Icon>
);

const RedCross = () => (
  <Icon className="IconRedCross">
    <img
      src="https://img.icons8.com/color/48/undefined/delete-sign--v1.png"
      alt="Red cross icon"
    />
  </Icon>
);

const RedHeart = () => (
  <Icon className="IconRedHeart">
    <img
      src="https://img.icons8.com/emoji/48/undefined/red-heart.png"
      alt="Red heart icon"
    />
  </Icon>
);

const Tick = () => (
  <Icon className="IconTick">
    <img
      src="https://img.icons8.com/material-outlined/24/undefined/checkmark--v1.png"
      alt="Tick icon"
    />
  </Icon>
);

const Trash = () => (
  <Icon className="IconTrash">
    <img
      src="https://img.icons8.com/ios-glyphs/30/undefined/filled-trash.png"
      alt="Trash icon"
    />
  </Icon>
);

const Acknowledge = () => (
  <p className="IconAcknowledge">
    All icons by&nbsp;
    <a href="https://icons8.com">Icons8</a>
  </p>
);

// -----------------------------------------
// Compose Icon Object /////////////////////
// -----------------------------------------

Icon.Collapse = Collapse;
Icon.Cross = Cross;
Icon.Database = Database;
Icon.Expand = Expand;
Icon.Group = Group;
Icon.List = List;
Icon.Pen = Pen;
Icon.Plus = Plus;
Icon.RedCross = RedCross;
Icon.RedHeart = RedHeart;
Icon.Tick = Tick;
Icon.Trash = Trash;
Icon.Acknowledge = Acknowledge;

export default Icon;

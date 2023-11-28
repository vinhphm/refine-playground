import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Collapse } from "antd";
import { CSSProperties, FC, useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

interface SortableItemProps {
  id: string;
  style: CSSProperties;
  label: string;
  children: React.ReactNode;
}

const SortableItem: FC<SortableItemProps> = ({
  id,
  style,
  label,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const sortableStyle: CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={sortableStyle} {...attributes} {...listeners}>
      <Panel header={label} key={id} style={style}>
        {children}
      </Panel>
    </div>
  );
};

const Playground: FC = () => {
  const [items, setItems] = useState([
    { id: "1", label: "This is panel header 1", content: "Panel content 1" },
    { id: "2", label: "This is panel header 2", content: "Panel content 2" },
    { id: "3", label: "This is panel header 3", content: "Panel content 3" },
  ]);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) =>
        arrayMove(
          items,
          items.findIndex(({ id }) => id === active.id),
          items.findIndex(({ id }) => id === over.id)
        )
      );
    }
  };

  const panelStyle: CSSProperties = {
    marginBottom: 24,
    background: "#f7f7f7",
    borderRadius: "2px",
    border: "none",
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(({ id }) => id)}
        strategy={verticalListSortingStrategy}
      >
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
        >
          {items.map(({ id, label, content }) => (
            <SortableItem key={id} id={id} style={panelStyle} label={label}>
              <p>{content}</p>
            </SortableItem>
          ))}
        </Collapse>
      </SortableContext>
    </DndContext>
  );
};

export default Playground;

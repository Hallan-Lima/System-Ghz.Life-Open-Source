<?php
/**
 * @author HallTech AI
 */

namespace Domain\Entities;

class Task
{
    public string $id;
    public string $title;
    public string $type;
    public string $priority;
    public bool $isCompleted;
    public bool $isPinned;
    public ?string $dueDate;
    public ?string $content;
    public array $tags;
    public ?float $targetValue;
    public ?float $currentValue;
    public ?float $estimatedCost;
    public ?string $unit;
    public ?string $recurrence;
}
